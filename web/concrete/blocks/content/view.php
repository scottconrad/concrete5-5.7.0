<?php
	defined('C5_EXECUTE') or die("Access Denied.");
	$content = $controller->getContent();
	$c = Page::getCurrentPage();
	if (!$content && $c->isEditMode()) { ?>
		<div class="ccm-edit-mode-disabled-item"><?=t('Empty Content Block.')?></div> 
	<? } else {
		print $content;
	}