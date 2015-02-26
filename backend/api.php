<?php

$global['basePath'] = "E:\studio\quest\backend";

switch($_GET['action'])
{
	case 'getSurvey':
	{
		$code = $_GET['code'];
		header('Content-Type: application/json');
		echo json_encode(getSurveyJson($code));
		break;
	}
}


function getSurveyJson($code)
{
	global $global;
	$xmlDataPath = $global['basePath']."\\data\\".$code.".xml";
	//echo $xmlDataPath;
	$xml = simplexml_load_file($xmlDataPath);
	
	$json['meta']['title'] = (string)$xml->meta->title;
	
	$counter = 0;
	foreach($xml->questions->item as $item)
	{
		$questionAttr =  $item->attributes();
		$answers = null;
		if(count($item->answers->item) > 0)
		{
			foreach($item->answers->item as $answer)
			{
				$answerAttr =  $answer->attributes();
				$answers[] = array('title'=>(string)$answer, 'score'=>(int)$answerAttr['score']);
			}
		}
		$questions[$counter] = array(
			'id'=>(string)$questionAttr['id'],
			'type'=>(string)$questionAttr['type'],
			'isInvisibleByDefault'=>(boolean)$questionAttr['isInvisibleByDefault'],
			'question'=>(string)$item->question,
			'answers'=>$answers
		);
		$counter++;
	}
	
	$json['questions'] = $questions;
	
	return $json;
	
}