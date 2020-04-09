const​​ functions ​​= ​​require​(​'firebase-functions'​);
const ​​admin​​ =​​ require​(​'firebase-admin'​);

admin​.​initializeApp​(​functions​.​config​().​firebase​);
const​​ googleapis_1​​ =​​ require​(​"googleapis"​);
const​​ ml​​ = ​​googleapis_1​.​google​.​ml​(​'v1'​);

exports​.​predictSPAM​​ = ​​functions​.​https​.​onRequest​(​async​​(request,​​response)​​=>
{
    const ​​account_days_old​​ = ​​request​.​body​.​account_days_old​;​
    const​​ followers_count​​ =​​ request​.​body​.​followers_count​;​
    const ​​following_count ​​= ​​request​.​body​.​following_count​;
    ​const​​ publications_count​​ =​​ request​.​body​.​publications_count​;

    const​​ instance ​​= [[account_days_old,followers_count,following_count,publications_count]]

    const ​​model​​ =​​ "[HERE THE NAME OF YOUR MODEL]"​;​
    const​ { ​credential​ } ​=​​ await googleapis_1​.​google​.​auth​.​getApplicationDefault​();

    const ​​modelName​​ =​​ `projects/[YOUR PROJECT ID HERE]/models/​${​model​}​`​;
	​const​​ preds ​​= ​​await ​​ml​.​projects​.​predict​({
		auth​:​​ credential, 
		name​:​​ modelName,  
		requestBody​:​​ {
			​instance
		​}​
	});​
	response​.​send​(​preds​.​data​[​'predictions'​][​0​]);
});