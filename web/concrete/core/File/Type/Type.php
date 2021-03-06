<?
namespace Concrete\Core\File\Type;
use Loader;
use \Concrete\Core\Package\PackageList;
use Core;
class Type {

	// File Type Constants
	const T_IMAGE = 1;
	const T_VIDEO = 2;
	const T_TEXT = 3;
	const T_AUDIO = 4;
	const T_DOCUMENT = 5;
	const T_APPLICATION = 6;
	const T_UNKNOWN = 99;
	
	public $pkgHandle = false;
	
	public function __construct() {
		$this->type = static::T_UNKNOWN;
		$this->name = $this->mapGenericTypeText($this->type);
	}
	
	public function getPackageHandle() {return $this->pkgHandle;}
	public function getName() {return $this->name;}
	public function getExtension() {return $this->extension;}
	public function getCustomImporter() {return $this->customImporter;}
	public function getGenericType() {return $this->type;}
	public function getView() {return $this->view;}	
	public function getEditor() { return $this->editor;}
	
	protected function mapGenericTypeText($type) {
		switch($type) {
			case static::T_IMAGE:
				return t('Image');
				break;
			case static::T_VIDEO:
				return t('Video');
				break;
			case static::T_TEXT:
				return t('Text');
				break;
			case static::T_AUDIO:
				return t('Audio');
				break;
			case static::T_DOCUMENT:
				return t('Document');
				break;
			case static::T_APPLICATION:
				return t('Application');
				break;
			case static::T_UNKNOWN:
				return t('File');
				break;

		}
	}
	
	public function getGenericTypeText($type) {
		if ($type > 0) {
			return static::mapGenericTypeText($type);
		} else if (!empty($this->type)) {
			return static::mapGenericTypeText($this->type);		
		}
	}
	
	public function getCustomInspector() {
        $class = '\\Concrete\\Core\\File\\Type\\Inspector\\' . Loader::helper('text')->camelcase($this->getCustomImporter()) . 'Inspector';
		$cl = Core::make($class);
		return $cl;
	}
	
	/** 
	 * Returns a thumbnail for this type of file
	 */
	public function getThumbnail($level, $fullImageTag = true) {
		$width = constant("AL_THUMBNAIL_WIDTH_LEVEL{$level}");
		$height = constant("AL_THUMBNAIL_HEIGHT_LEVEL{$level}");
		if (file_exists(DIR_AL_ICONS . '/' . $this->extension . '.png')) {
			$url = REL_DIR_AL_ICONS . '/' . $this->extension . '.png';
		} else {
			$url = AL_ICON_DEFAULT;
		}
		if ($fullImageTag == true) {
			return '<img src="' . $url . '" class="ccm-generic-thumbnail" width="' . $width . '" height="' . $height . '" />';
		} else {
			return $url;
		}
	}
	
		

}