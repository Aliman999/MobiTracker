<?php
//UniqueValues.php
class UniqueValues{
    #The data Array
    private $dataArray;
    /*
        The index you want to get unique values.
        It can be the named index or the integer index.
        In our case it is "member_name"
    */
    private $indexToFilter;

    public function __construct($dataArray, $indexToFilter){
        $this->dataArray = $dataArray;
        $this->indexToFilter = $indexToFilter;
    }
    private function getUnique(){
        foreach($this->dataArray as $key =>$value){
            $id[$value[$this->indexToFilter]]=$key;
        }
        return array_keys(array_flip(array_unique($id,SORT_REGULAR)));
    }
    public function getFiltered(){
        $array = $this->getUnique();
        $i=0;
        foreach($array as $key =>$value){
            $newAr[$i]=$this->dataArray[$value];
            $i++;
        }
        return $newAr;
    }
}
?>
