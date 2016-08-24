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
