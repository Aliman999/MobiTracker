<?php
if($_SESSION['faction'] == 0){
  $service = array("Racing", "Delivery", "Security", "Scouting", "Medical", "Charting Regular", "Charting Luxury");
}else{
  $service = array("Racing", "Delivery", "Security", "Head Hunting", "Scouting", "Medical", "VIP Smuggling");
}
?>
