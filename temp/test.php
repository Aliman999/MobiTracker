<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

class Thesaurus
{
    private $thesaurus;

    function __construct(array $thesaurus)
    {
        $this->thesaurus = $thesaurus;
    }

    public function getSynonyms(string $word) : string
    {
        return JSON_ENCODE($this->thesaurus[$word], true);
    }
}

$thesaurus = new Thesaurus(
    [
        "buy" => array("purchase"),
        "big" => array("great", "large")
    ]
);

echo $thesaurus->getSynonyms("big");
echo "\n";
echo $thesaurus->getSynonyms("agelast");
