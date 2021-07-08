<?php
class Thesaurus
{
    private $thesaurus;

    function __construct(array $thesaurus)
    {
        $this->thesaurus = $thesaurus;
    }

    public function getSynonyms(string $word) : string
    {
      $data = array(
        "word" => $word,
        "synonyms" => $this?->thesaurus[$word] ? $this->thesaurus[$word] : array()
      );
      return json_encode($data);
      /*
      return json_encode(
        "word" -> $word,
        "synonyms" -> $this?->thesaurus[$word]
      );
      */
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
