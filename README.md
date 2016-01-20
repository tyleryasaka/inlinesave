This repository houses 2 plugins for CKEditor: [inlinesave](#inlinesave) and [inlinecancel](#inlinecancel).

inlinesave
==========

http://ckeditor.com/addon/inlinesave

This plugin allows the user to save the content for an inline editor via http POST.

###Usage

####1. Add the plugin to your editor. [Help](http://docs.ckeditor.com/#!/guide/dev_plugins)

####2. Set configuration options

The options are:
- `postUrl` (string): the url to send the data to, via http POST
- `onSuccess` (function): function to call when data is sent successfully
- `onFail` (function): function to call when data cannot be sent; the http status code is passed into this function
- `useJqueryPost` (boolean): if set to `true`, uses jQuery post and url encoded data (this is for backwards compatibility more than anything else; it is optional and defaults to `false`)

Sample configuration object (place this in your configuration file):

    config.inlinesave = {
      postUrl: '/myurl',
      onSuccess: function() { console.log('success'); },
      onFailure: function(error) { console.log('fail', error); },
      useJqueryPost: false
    };

####3. Receive the data on your server.

By default the data is sent as JSON. (If you set useJqueryPost to `true`, then the data will be sent using jQuery's post method instead.) There are 2 fields you will receive either way:

- editabledata (string): the data being saved from the editor
- editorID (string): the identifier for the editor (useful for distinguishing between different editors)

Example data (in default JSON format):

    {
      editabledata: '<h1>Hello world!</h1>\n\n<p>I&#39;m an instance of <a href="http://ckeditor.com">CKEditor</a>.</p>\n',
      editorID: 'cke_editor'
    }

inlinecancel
==========

http://ckeditor.com/addon/inlinecancel

This is a simple cancel button for the CKEditor toolbar, designed to go along with the inlinesave addon (above). By default, clicking the button brings up an intrusive javascript confirmation box, and if the user confirms the page is reloaded. However, a custom `onCancel` function can be specified, allowing the developer to implement his/her own functionality for the button.

###Usage

####1. Add the plugin to your editor. [Help](http://docs.ckeditor.com/#!/guide/dev_plugins)

####2. Set configuration options

The options are:
- `onCancel` (function): function to call when the button is clicked (optional)

Sample configuration object (place this in your configuration file):

    config.inlinecancel = {
      onCancel: function() { console.log('cancel'); }
    };


