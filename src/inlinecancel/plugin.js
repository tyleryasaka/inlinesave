CKEDITOR.plugins.add( 'inlinecancel',
{
	init: function( editor )
	{
		var config = editor.config.inlinecancel,
			iconName;

		if (typeof config == "undefined") {
			config = {}; // default to empty object
		}

		iconName = !!config.useColorIcon ? 'inlinecancel-color.svg' : 'inlinecancel.svg';

		editor.addCommand( 'inlinecancel',
			{
				exec : function( editor )
				{
					var onCancel = config.onCancel;
					if (typeof onCancel === "function") {
						onCancel(editor);
					} else {
						throw new Error("CKEditor inlinecancel: You must define config.inlinecancel as a function in your configuration file. See http://ckeditor.com/addon/inlinecancel");
					}
				}
			});
		editor.ui.addButton( 'Inlinecancel',
		{
			toolbar: 'document',
			label: 'Cancel',
			command: 'inlinecancel',
			icon: this.path + 'images/' + iconName
		} );
	}
} );
