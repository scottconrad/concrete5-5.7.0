/**
 * block ajax
 */

!function(global, $) {
	'use strict';

	function ConcreteAjaxBlockForm($form, options) {
		'use strict';
		var my = this;
		options = $.extend({
			'iframe': true,
			'task': false,
			'dragAreaBlockID': false,
			'bID': false
		}, options);
		my.options = options;

		if (options.dragAreaBlockID) {
			$form.find('input[name=dragAreaBlockID]').val(options.dragAreaBlockID);
		}
		return ConcreteAjaxForm.call(my, $form, options);
	}

	ConcreteAjaxBlockForm.prototype = Object.create(ConcreteAjaxForm.prototype);

	ConcreteAjaxBlockForm.prototype.beforeSubmit = function(my) {
		ConcreteAjaxForm.prototype.beforeSubmit.call(this, my);
	};

	ConcreteAjaxBlockForm.prototype.success = function(resp, my) {
		if (my.validateResponse(resp)) {
			var cID = (resp.cID) ? resp.cID : CCM_CID,
				action = CCM_TOOLS_PATH + '/edit_block_popup?cID=' + cID + '&bID=' + resp.bID + '&arHandle=' + encodeURIComponent(resp.arHandle) + '&btask=view_edit_mode';

			jQuery.fn.dialog.closeTop();

			$.get(action, function(r) {

				ConcreteToolbar.disableDirectExit();
				jQuery.fn.dialog.hideLoader();
				var editor = new Concrete.getEditMode(),
					area = editor.getAreaByID(resp.aID);

				if (my.options.task == 'add') {
					var $area = $('div[data-area-id=' + resp.aID + ']');

					if (my.options.dragAreaBlockID) {
						// we are adding this block AFTER this other block.
						var $block = $area.find('div[data-block-id=' + my.options.dragAreaBlockID + ']');
						$block.next('.ccm-area-drag-area').after(r);
					} else {
						$area.find('.ccm-area-block-list').prepend(r);
					}
					var block = new Concrete.Block($('[data-block-id=' + resp.bID + ']'), editor);
					area.addBlock(block);
					if (area.getTotalBlocks() == 1) {
						// we have to destroy the old menu and create it anew
						area.bindMenu();
					}
					ConcreteAlert.notify({
					'message': ccmi18n.addBlockMsg,
					'title': ccmi18n.addBlock
					});
					jQuery.fn.dialog.closeAll();

					if (my.options.btSupportsInlineAdd) {
						editor.destroyInlineEditModeToolbars();
						ConcreteEvent.fire('EditModeExitInlineComplete', {
							block: block
						});
					}

				} else {
					// remove old block from area
					var block = area.getBlockByID(my.options.bID);
					var newBlock = block.replace(resp.bID, r);
					ConcreteAlert.notify({
					'message': ccmi18n.updateBlockMsg,
					'title': ccmi18n.updateBlock
					});					
	
					if (my.options.btSupportsInlineEdit) {
						editor.destroyInlineEditModeToolbars();
						ConcreteEvent.fire('EditModeExitInlineComplete', {
							block: newBlock
						});
					}

				}


			});
		}
	}

	// jQuery Plugin
	$.fn.concreteAjaxBlockForm = function(options) {
		return $.each($(this), function(i, obj) {
			new ConcreteAjaxBlockForm($(this), options);
		});
	}

	global.ConcreteAjaxBlockForm = ConcreteAjaxBlockForm;

}(this, $);