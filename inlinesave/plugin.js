CKEDITOR.plugins.add( 'inlinesave',
{
	init: function( editor )
	{
		editor.addCommand( 'inlinesave',
			{
				exec : function( editor )
				{
					addData();
					function addData() {
						var data = editor.getData();
						var dataID = editor.container.getId();
						var url = '';
						var onSuccess = function() {}; // callback when save is successful
						var onFailure = function(statusCode) {}; // callback when save fails
						url = editor.config.inlinesave.postUrl; // url to post data to
						onSuccess = editor.config.inlinesave.onSuccess;
						onFailure = editor.config.inlinesave.onFailure;
						if(editor.config.inlinesave.useJqueryPost) { // use the old jquery post method if desired
							jQuery.ajax({
								type: "POST",
								url: url,
								data: {
									editabledata: data,
									editorID: dataID
								}
							})
							.done(function (data, textStatus, jqXHR) {
								if(jqXHR.status == '200') {
									onSuccess();
								}
								else {
									onFailure(jqXHR.status);
								}
							})
							.fail(function (jqXHR, textStatus, errorThrown) {
								onFailure(jqXHR.status);
							});
						}
						else { // use pure javascript and send the data in json format (default)
							var payload = JSON.stringify({
								editabledata: data,
								editorID: dataID
							});
							var xhttp = new XMLHttpRequest();
							xhttp.onreadystatechange = function() {
								if(xhttp.readyState == 4) {
									if(xhttp.status == 200) {
										onSuccess();
									}
									else {
										onFailure(xhttp.status);
									}
								}
							};
							xhttp.open("POST", url, true);
							xhttp.setRequestHeader("Content-type", 'application/json');
							xhttp.send(payload);
						}
					}
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
