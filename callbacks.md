###Overview

This file is intended to provide some examples of how to effectively use the callbacks that you can set as configuration parameters for the CKEditor inlinesave and inlinecancel plug-ins.

**NOTE:** Most of the following code samples are excerpts, and presume that you have enough know-how with JavaScript that you can translate the basic ideas into your specific application code.

These callbacks are listed in [inlinesave Usage](https://github.com/tyleryasaka/inlinesave#inlinesave) and [inlinecancel Usage](https://github.com/tyleryasaka/inlinesave#usage-1) sections of the README.md file.

    config.inlinesave = {
      postUrl: '/myurl',
      postData: {test: true},
      useJSON: false,
      
      // Callbacks...
      onSave: function(editor) { console.log('clicked save', editor); },                                   
      onSuccess: function(editor, data) { console.log('save successful', editor, data); },                 
      onFailure: function(editor, status, request) { console.log('save failed', editor, status, request); }
    };

    config.inlinecancel = {
      onCancel: function(editor) { console.log('cancel', editor); }
    };

In addition, it can be helpful to also use the focus and blur callbacks that CKEditor already allows you to set, in conjunction with the above.  For example, the focus callback can allow you to save the current state of the editor instance in order to restore it in an onCancel callback.

    config.on = {
      focus: function(event) {
    		// Do something when an inline editor instance receives the focus.
      },
      blur: function(event) {
    		// Do something when an inline editor instance loses the focus.  
      }
    };


###Typical Use Cases

1. Show a nice looking success or failure notification using the CKEditor notification plug-in when saving an inline editor instance.

    **NOTE:**  This requires the CKEditor notification plug-in to be loaded.

    ```
    onSuccess: function(editor, data) { 
        editor.showNotification( 'Your changes have been successfully saved.', 'success' )
    }
    
    onFailure: function(editor, status, request) {
        editor.showNotification( 'Your changes could not be saved at this time.', 'warning');
    }
    ```


2. Show a "loading" spinner while saving an inline editor instance.

    For purposes of discussion, let's assume the html img element for this spinner has an id of "spinner".  Also, you need to make sure that the style for the element contains "display:none", so that the spinner only shows when you want it to.  For example:

    ```
    <!-- Some sample HTML markup... -->
    <img id="spinner" src="/images/ajax-loader.gif" alt="AJAX Loading Spinner" style="display:none;position:fixed;top:50%;left:50%;z-index:#7FFFFFFF;">  <!-- Or similar... -->
    <div id="ckeditor_inline" contenteditable="true" style="width:50%;height:50%;">
        <!-- Some editable content... -->
    </div>
    ```

    Now, using the callbacks above, you could set up something similar to the following:
    ```
    onSave: function(editor) { 
        document.getElementById("spinner").style.display = "";    	    // No jQuery
    }
        *** OR ***
    onSave: function(editor) { 
        $("spinner").show();    								    	// jQuery version
    }

    onSuccess: function(editor, data) {
    	document.getElementById("spinner").style.display = "none";		// No jQuery
    	//  other code ... maybe show a success notification
    }
       *** OR ***
    onSuccess: function(editor, data) {
    	$("spinner").hide(); 											// jQuery version
    	//  other code ... maybe show a success notification
    }
    
    onFailure: function(editor, status, request) {
    	document.getElementById("spinner").style.display = "none";		// No jQuery
    	//  other code ... maybe show a failure notification
    }
       *** OR ***
    onFailure: function(editor, status, request) {
    	$("spinner").hide(); 											// jQuery version
    	//  other code ... maybe show a failure notification
    }
    ```

3. Cancel edits in the onCancel event without having to refresh the page.

    While CKEditor does have an undo manager and periodically takes snapshots of your content so that it can be undone, for a simple onCancel functionality, we can just save the initial contents of the editor as a data attribute in the on focus event.  The following should give you a general idea of how to implement this.

    ```
    function saveEditorContents(editor) {
        var containerId = editor.container.getId();
        document.getElementById(containerId).dataset.savedHTML = editor.getData();  // Save current editor contents in data attribute
    }

    function restoreEditorContents(editor) {
        var containerId = editor.container.getId(),
            dataset = document.getElementById(containerId).dataset;
        if (savedHTML in dataset) {                          // Make sure contents were actually saved
            editor.setData(dataset.savedHTML);               // Restore editor contents from data attribute
        }
    }
    
    config.inlinesave.onSuccess = function(editor, data) { 
        saveEditorContents(editor);                            // Saves the current editor contents on successful save.
        // Show notifications, hide spinner, etc.
    };

    config.inlinecancel.onCancel = function(editor) { 
        restoreEditorContents(editor);                         // Undo all changes since last time contents were saved.
        // Show notifications, etc.
    };

    config.on = {
      focus: function(event) {
            saveEditorContents(event.editor);      // Need to save the initial contents.
      },
      blur: function(event) {
            restoreEditorContents(event.editor);   // Makes blur work like cancel... Delete this if you don't want that.
      }
    };
    ```
    
*Feel free to contribute pull requests for this file to add additional examples of use cases.  
Your input and contributions are greatly appreciated!*
