<? defined('C5_EXECUTE') or die("Access Denied."); ?>
<?
if (is_array($image)) {
	$image = $image[0];
}
$ownerID = $this->page->vObj->cvAuthorUID;
$u = User::getByUserID($ownerID);
$ownerName = $u->getUserName();
?>
<div class="ccm-gathering-masthead-image-left ccm-gathering-masthead-image ccm-gathering-scaled-image">
	<a href="#" data-overlay="gathering-item">
		<img class="float-left" src="<?=$image->getPath()?>" alt="<?php echo t('Preview Image') ?>" />
	</a>
	<div class="ccm-gathering-tile-title-description float-left">
		<div class="ccm-gathering-tile-headline"><a href="<?=$link?>"><?=$title?></a></div>
		<div class="ccm-gathering-tile-byline"><?php echo t('By '). '<span class="author-name">' .$ownerName. '</span>' ?></div>
		<div class="ccm-gathering-tile-description">
		<?=$description?>
		</div>
	</div>
	<div class="clearfix" style="clear: both;"></div>
</div>
