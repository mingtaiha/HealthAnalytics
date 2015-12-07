<?php
#This file reads the contents of the files in the model directory to generate the stats
#Six stats are fetch, which are fetched as specified by the "stats" variable.
#They are JSON files which this algorithm recursively parses until the desire data is collected.
#Give the give of the JSON file, it was determined that leaving this data in a JSON file was
#the most efficient way of accessing this data.  Putting this data into to database was very
#slow given the amount of data that the database would have to return.

class model{
	public $stats=['Dia','HDL','HR','LDL','Sys','Tri'];
	public $personData=[];
	public $minValue=0;
	public $maxValue=0;

	public function __construct($personData){
		$this->personData=$personData;
	}

	private function __branch($data){
		$m=count($data);
		for($i=0;$i<$m;$i++){
			$min=$data[$i]['Min'];
			$max=$data[$i]['Max'];
			$value=$data[$i]['value'];
			$attrib=$data[$i]['key'];
			$val_count=count($value);
			$matchValue=FALSE;
			$this->minValue=$min;
			$this->maxValue=$max;
			if($val_count==1){
				if($this->personData[$attrib]==$value[0]){$matchValue=TRUE;}
			}
			else{
				if($this->personData[$attrib]>=$value[0]&&$this->personData[$attrib]<=$value[1]){$matchValue=TRUE;}
			}
			if($matchValue){
				$this->__branch($data[$i]['children']);
				break;
			}
		}
	}

	public function getStats(){
		$results=[];
		foreach($this->stats as $key=>$val){
			$modelFile='model/'.$val.'_Models/'.$this->personData['State'].'_'.$val.'.json';
			$data=json_decode(file_get_contents($modelFile),TRUE);
			$this->__branch($data['children']);
			$results[$val]['min']=$this->minValue;
			$results[$val]['max']=$this->maxValue;
		}
		return $results;
	}
}