CKEDITOR.plugins.add( 'inlinecancel',
{
	init: function( editor )
	{
		editor.addCommand( 'inlinecancel',
			{
				exec : function( editor )
				{
					if(typeof editor.config.inlinecancel == 'undefined') { // give useful error message if user doesn't define config.inlinecancel
						throw new Error("CKEditor inlinecancel: You must define config.inlinecancel in your configuration file. See http://ckeditor.com/addon/inlinecancel");
						return;
					}
					var onCancel = editor.config.inlinecancel.onCancel;
					if (typeof onCancel === "function") {
						onCancel(editor);
					}
				}
			});
		editor.ui.addButton( 'Inlinecancel',
		{
			label: 'Cancel and Reload Page',
			command: 'inlinecancel',
			icon: this.path + 'images/inlinecancel.png'
		} );
	}
} );
