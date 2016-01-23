This repository houses 2 plugins for CKEditor: [inlinesave](#inlinesave) and [inlinecancel](#inlinecancel).

inlinesave
==========

http://ckeditor.com/addon/inlinesave

This plugin allows the user to save the content for a CKEditor inline editor via http POST.

###Usage

####1. Add the plugin to your editor. [Help](http://docs.ckeditor.com/#!/guide/dev_plugins)

####2. Set configuration options

The options are:
- `postUrl` (string): the url to send the data to, via http POST
- `postData` (object; optional): a JavaScript object containing additional data to send with the save; e.g.,` {test: true}`
- `onSave` (function; optional): function to call when the save button is pressed; editor element is passed into this function
- `onSuccess` (function; optional): function to call when data is sent successfully; editor element and http response data are passed into this function
- `onFail` (function; optional): function to call when data cannot be sent; the editor element, http status code, and [XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) object are passed into this function
- `useJSON` (boolean; optional): when `true`, the plugin will send data to the server with Content-type 'application/json'; defaults to `false` and uses Content-type 'application/x-www-form-urlencoded' (see step #3)

Sample configuration object (place this in your configuration file or use when initializing a new inline editor instance):

    config.inlinesave = {
      postUrl: '/myurl',
      postData: {test: true},                                                                              
      onSave: function(editor) { console.log('clicked save', editor); },                                   
      onSuccess: function(editor, data) { console.log('save successful', editor, data); },                 
      onFailure: function(editor, status, request) { console.log('save failed', editor, status, request); },
      useJSON: false
    };

####3. Receive the data on your server.

By default, the data is sent with Content-type 'application/x-www-form-urlencoded' (this is the default type for HTML forms). However, if `config.useJSON` is set to `true`, then the Content-type will be 'application/json' and the data will be sent as a JSON object.

In either case, there are 2 fields you will always receive, in addition to those specified in the postData option:

- editabledata (string): the data being saved from the editor
- editorID (string): the identifier for the editor (useful for distinguishing between different editors)

Example data:

- editabledata: `'<h1>Hello world!</h1>\n\n<p>I&#39;m an instance of <a href="http://ckeditor.com">CKEditor</a>.</p>\n'`
- editorID: `'cke_editor'`
- test: `'true'`

Note that 'test' was an additional field specified in `config.inlinesave.postData` (as demonstrated in the example configuration above).

###Usage with CKEditor notifications

Use inlinesave along with the [notification](http://ckeditor.com/addon/notification) addon to easily display nice notifications.

Use the following code in the `onSuccess` callback to display a nice success notification:

    editor.showNotification( 'Your changes have been successfully saved.', 'success' );

Likewise, the following code can be added to the `onFailure` callback:

    editor.showNotification( 'Your changes could not be saved at this time.', 'warning' );

###Notes

Some nifty things that can be done with this plugin, even with multiple inline editor instances on a web page:

1. Specify and save arbitrary data to the server along with the save by using the postData option.
2. Start showing a "loading" spinner via the `onSave` callback and remove it in either the `onSuccess` or `onFailure` callbacks.
3. Manipulate the editor instances from the callbacks using the editor parameter passed to them.
4. If using the [inlinecancel](#inlinecancel) plugin as well: along with #3 above, changes can be undone with inlinecancel's `onCancel` callback, if the original editor state is saved prior to edits.

inlinecancel
==========

http://ckeditor.com/addon/inlinecancel

This is a simple cancel button for the CKEditor toolbar, designed to go along with the inlinesave addon (above). A custom `onCancel` function can be specified, allowing the developer to implement his/her own functionality for the button.

###Usage

####1. Add the plugin to your editor. [Help](http://docs.ckeditor.com/#!/guide/dev_plugins)

####2. Set configuration options

The options are:
- `onCancel` (function): function to call when the button is clicked; editor element is passed into this function (can be used to manually undo changes; see [notes](#notes))

Sample configuration object (place this in your configuration file):

    config.inlinecancel = {
      onCancel: function(editor) { console.log('cancel', editor); }
    };

###Credits

Thanks to [@SteveTheTechie](https://github.com/SteveTheTechie) for contributing some snazziness to both of the addons
