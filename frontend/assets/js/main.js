var baseUrl = "http://studio/quest"
$(function() {
    console.log( "ready!" );
	loadSurvey("sales");
});

function loadSurvey(code)
{
	$.get( baseUrl+"/backend/api.php?action=getSurvey&code="+code, function( data ) {
		console.log(data)
		
		$('#render').html('<h1>'+data.meta.title+'</h1><form>')
		$.each(data.questions, function(i, item){
			var qItemClasses = 'qItem ';
			if(item.isInvisibleByDefault) qItemClasses += "hidden";
			$('#render').append('<div id="qItem-'+item.id+'" class="'+qItemClasses+'"><h3>'+(item.question)+'</h3></div>')
			
			if(item.type == "radio")
			{
				$('#render #qItem-'+item.id).append('<ul></ul>');
				$.each(item.answers, function(i, answer){
					
					$('#render #qItem-'+item.id+' ul').append('<li><div class="radio"><label><input name="aItem-'+item.id+'" type="radio" class="" />'+(answer.title)+'</label></div></li>');
				});
			}
			else if(item.type == "scale")
			{
				$('#render #qItem-'+item.id).append('<ul></ul>');
				$.each(item.answers, function(i, answer){
					
					$('#render #qItem-'+item.id+' ul').append('<li><div class="radio"><label><input name="aItem-'+item.id+'" type="radio" class="" />'+(answer.title)+'</label></div></li>');
				});
			}
			else if(item.type == "freetext")
			{
				$('#render #qItem-'+item.id).append('<input type="text" class="form-control" />');
			}
			
			
			
		});
		$('#render').append('</form>')
		//console.log(data.questions[1].item.question)
	});
}