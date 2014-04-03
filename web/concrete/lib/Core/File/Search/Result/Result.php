<?
namespace Concrete\Core\File\Search\Result;
use \Concrete\Core\Search\Result\Result as SearchResult;
class Result extends SearchResult {

	public function getItemDetails($item) {
		$node = new FileSearchResultItem($this, $this->listColumns, $item);
		return $node;
	}

	public function getColumnDetails($column) {
		$node = new FileSearchResultColumn($this, $column);
		return $node;
	}

}