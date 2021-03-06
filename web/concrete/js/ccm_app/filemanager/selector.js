/**
 * block ajax
 */

!function(global, $) {
	'use strict';

	function ConcreteFileSelector($element, options) {
		'use strict';
		var my = this,
			options = $.extend({
				'chooseText': ccmi18n_filemanager.chooseNew,
				'inputName': 'concreteFile',
				'fID': false
			}, options);

		my.$element = $element;
		my.options = options;
		my._chooseTemplate = _.template(my.chooseTemplate, {'options': my.options});
		my._loadingTemplate = _.template(my.loadingTemplate);
		my._fileLoadedTemplate = _.template(my.fileLoadedTemplate);
		my._fileMenuTemplate = _.template(ConcreteFileManagerMenu.get());

		my.$element.append(my._chooseTemplate);
		my.$element.on('click', 'div.ccm-file-selector-choose-new', function() {
			var w = $(window).width() - 53;
			$.fn.dialog.open({
				width: w,
				height: '100%',
				href: CCM_DISPATCHER_FILENAME + '/ccm/system/dialogs/file/search',
				modal: true,
				title: ccmi18n_filemanager.title,
				onOpen: function() {
					ConcreteEvent.unsubscribe('FileManagerSelectFile');
					ConcreteEvent.subscribe('FileManagerSelectFile', function(e, data) {
						jQuery.fn.dialog.closeTop();
						my.loadFile(data.fID);
					});
				}
			});
			return false;
		});


		if (my.options.fID) {
			my.loadFile(my.options.fID);
		}

	}

	ConcreteFileSelector.prototype = {

		chooseTemplate: '<div class="ccm-file-selector-choose-new"><%=options.chooseText%></div>',
		loadingTemplate: '<div class="ccm-file-selector-loading"><img src="' + CCM_IMAGE_PATH + '/throbber_white_16.gif" /></div>',
		fileLoadedTemplate: '<div class="ccm-file-selector-file-selected"><input type="hidden" name="<%=inputName%>" value="<%=file.fID%>" />' +
			'<div class="ccm-file-selector-file-selected-thumbnail"><img src="<%=file.thumbnailLevel1%>" /></div>' +
			'<div class="ccm-file-selector-file-selected-title"><div><%=file.title%></div></div><div class="clearfix"></div>' +
			'</div>',

		loadFile: function(fID) {
			var my = this;
			my.$element.html(my._loadingTemplate);
			$.ajax({
				type: 'post',
				dataType: 'json',
				url: CCM_DISPATCHER_FILENAME + '/ccm/system/file/get_json',
				data: {'fID': fID},
				error: function(r) {
	    			ConcreteAlert.dialog('Error', r.responseText);
				},
				success: function(r) {
					var file = r.files[0];
					my.$element.html(my._fileLoadedTemplate({'inputName': my.options.inputName, 'file': file}));
					my.$element.append(my._fileMenuTemplate({'displayClear': true, 'item': file}));
					my.$element.find('.ccm-file-selector-file-selected').concreteFileMenu({
						'container': my,
						'menu': $('[data-search-file-menu=' + file.fID + ']'),
						'menuLauncherHoverClass': 'ccm-file-manager-menu-item-hover'
					});
				}
			});
		}

	}

	// jQuery Plugin
	$.fn.concreteFileSelector = function(options) {
		return $.each($(this), function(i, obj) {
			new ConcreteFileSelector($(this), options);
		});
	}

	global.ConcreteFileSelector = ConcreteFileSelector;

}(this, $);
