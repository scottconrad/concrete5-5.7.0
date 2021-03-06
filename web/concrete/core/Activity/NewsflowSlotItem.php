<?
namespace Concrete\Core\Activity;
use Loader;
class NewsflowSlotItem {
	
	protected $content;
	public function __construct($content) {
		$this->content = $content;
	}
	public function getContent() {return $this->content;}

	public static function parseResponse($r) {
		$slots = array();
		try {
			// Parse the returned XML file
			$obj = @Loader::helper('json')->decode($r);
			if (is_object($obj)) {
				if (is_object($obj->slots)) {
					foreach($obj->slots as $key => $content) {
						$cn = new NewsflowSlotItem($content);
						$slots[$key] = $cn;
					}
				}
			}
		} catch (Exception $e) {}
		return $slots;

	}
}
