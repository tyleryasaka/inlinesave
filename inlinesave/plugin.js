CKEDITOR.plugins.add( 'inlinesave',
{
	init: function( editor )
	{
		editor.addCommand( 'inlinesave',
			{
				exec : function( editor )
				{
					(function addData() {
						var data = editor.getData(),
						    dataID = editor.container.getId(),
						    onSuccess = function() {},  	 	// callback when save is successful
						    onFailure = function(statusCode) {}, 	// callback when save fails
						    inlinesavecfg = editor.config.inlinesave,
						    url = inlinesavecfg.postUrl || ''; 		// url to post data to
						onSuccess = inlinesavecfg.onSuccess || onSuccess;
						onFailure = inlinesavecfg.onFailure || onFailure;
						if (!!inlinesavecfg.useJqueryPost) { 		// use the old jquery post method if desired
							jQuery.ajax({
								type: "POST",
								url: url,
								data: {
									editabledata: data,
									editorID: dataID
								},
								success: function(data, textStatus, jqXHR) {
									onSuccess(data);   	// Allow server to return data
								},
								error: function (jqXHR, textStatus, errorThrown) {
									onFailure(jqXHR.status);
								}
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
										onSuccess(xhttp.response); // Allow server to return data
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
					}());
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
