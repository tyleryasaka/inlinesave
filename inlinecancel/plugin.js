CKEDITOR.plugins.add( 'inlinecancel',
{
	init: function( editor )
	{
		editor.addCommand( 'inlinecancel',
			{
				exec : function( editor )
				{
					var onCancel = editor.config.inlinecancel.onCancel;
					if(onCancel) {
						onCancel();
					}
					else {
						if(confirm("Cancel and reload page? (All progress since last save will be lost.)"))
							location.reload(true);
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
