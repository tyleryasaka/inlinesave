CKEDITOR.plugins.add( 'inlinesave',
{
	init: function( editor )
	{
		editor.addCommand( 'inlinesave',
			{
				exec : function( editor )
				{
					var config = editor.config.inlinesave, 
					    postData = {};
					
					if (typeof config == "undefined") { // give useful error message if user doesn't define config.inlinesave
						throw new Error("CKEditor inlinesave: You must define config.inlinesave in your configuration file. See http://ckeditor.com/addon/inlinesave");
						return;
					}
					if (typeof config.postUrl == "undefined") { // give useful error message if user doesn't define config.inlinesave.postUrl
						throw new Error("CKEditor inlinesave: You must define config.inlinesave.postUrl in your configuration file. See http://ckeditor.com/addon/inlinesave");
						return;
					}

					if (typeof config.onSave == "function") {
						onSave(editor);				// Allow showing spinner
					}
					
					// Clone postData object from config and add editabledata and editorID properties
					CKEDITOR.tools.extend(postData, config.postData || {}, true);  // Clone config.postData to prevent changing the config.
					postData.editabledata = editor.getData();
					postData.editorID = editor.container.getId();
					
					// Use pure javascript (no dependencies) and send the data in json format...
					var xhttp = new XMLHttpRequest();
					xhttp.onreadystatechange = function() {
						if (xhttp.readyState == 4) {
							// If success, call onSuccess callback if defined
							if (typeof config.onSuccess == "function" && xhttp.status == 200) {
								onSuccess(editor, xhttp.response); // Allow server to return data
							}
							// If error, call onFailure callback if defined
							else if (typeof config.onFailure == "function") {
								onFailure(editor, xhttp.status, xhttp);
							}
						}
					};
					xhttp.open("POST", config.postUrl, true);
					xhttp.setRequestHeader("Content-type", 'application/json');
					xhttp.send(JSON.stringify(postData));	// Send data in JSON format...
				}
			});
		editor.ui.addButton( 'Inlinesave',
		{
			label: 'Save',
			command: 'inlinesave',
			icon: this.path + 'images/inlinesave.png'
		} );
	}
} );
