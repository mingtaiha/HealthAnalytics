<?php include('datastore.php');

class ProcessorTest extends PHPUnit_Framework_TestCase
{
	protected static $ds;
	protected static $email='test@testemail.com';
	protected static $authtoken;
	protected static $workout_id;
	protected static $userfood_id;

	public static function dataProvider(){
		return [[[
			'email'=>self::$email,
			'password'=>'123456'
		]]];
	}

	public static function setUpBeforeClass(){
		self::$ds=new datastore();
	}

	public static function tearDownAfterClass(){
		self::$ds->db->query('DELETE FROM workout WHERE workout_id="'.self::$workout_id.'"');
		self::$ds->db->query('DELETE FROM food WHERE userfood_id="'.self::$userfood_id.'"');
		self::$ds->db->query('DELETE FROM people WHERE email="'.self::$email.'"');
		self::$ds=NULL;
	}

	public function curl($url,$post){
		$ch = curl_init();
		curl_setopt($ch, CURLOPT_URL,'http://www.rugatech.com/se1/api/'.$url);
		curl_setopt($ch, CURLOPT_RETURNTRANSFER,TRUE);
		curl_setopt($ch, CURLOPT_HEADER, TRUE);
		if(!empty($post)){
			curl_setopt($ch,CURLOPT_POST, count($post));
			curl_setopt($ch,CURLOPT_POSTFIELDS, http_build_query($post));
		}
		$response=curl_exec($ch);
		$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
		$header = substr($response, 0, $header_size);
		$body = substr($response, $header_size);
		return([$header,$body]);
	}

    /**
     * @param array $testData
	 * @dataProvider dataProvider
     */
	public function test_addUser(array $testData){
		$post=['fname'=>'Bob','lname'=>'Smith','password'=>$testData['password'],'mi'=>'E','weight'=>220,'waist_size'=>36,'height'=>72,'birth_date'=>'1987-09-16T00:00:00Z','gender'=>'M','address1'=>'123 Easy Street','city'=>'Edison','state'=>'NJ','zip'=>'08854','ethnicity'=>'Hisp'];
		$data=$this->curl('addUser/'.$testData['email'],$post);
		$headers=explode("\r\n",$data[0]);
		$this->assertEquals($headers[0],'HTTP/1.1 200 OK');
	}

    /**
     * @param array $testData
	 * @dataProvider dataProvider
     */
	public function test_loginUser(array $testData){
		$post=['password'=>$testData['password']];
		$data=$this->curl('loginUser/'.$testData['email'],$post);
		$token=json_decode($data[1],TRUE);
    	self::$authtoken=$token['authtoken'];
		$headers=explode("\r\n",$data[0]);
		$this->assertEquals($headers[0],'HTTP/1.1 200 OK');
	}

	public function test_addFood(){
		$post=['authtoken'=>self::$authtoken,'food'=>2,'serving'=>2.5,'meal'=>'breakfast','food_timestamp'=>'2015-11-23T14:34:43.954Z','comments'=>'Here are my commentsz'];
		$data=$this->curl('addFood/',$post);
		$newFood=json_decode($data[1],TRUE);
		self::$userfood_id=$newFood['userfood_id'];
		$headers=explode("\r\n",$data[0]);
		$this->assertEquals($headers[0],'HTTP/1.1 200 OK');
	}

	public function test_addWorkout(){
		$post=['authtoken'=>self::$authtoken,'workout_type'=>'run','distance'=>1.00,'duration'=>120.0,'workout_timestamp'=>'2015-11-23T14:34:43.954Z','calories'=>200,'comments'=>'Here are my workout comments'];
		$data=$this->curl('addWorkout/'.$testData['email'],$post);
		$newWorkout=json_decode($data[1],TRUE);
		self::$workout_id=$newWorkout['workout_id'];
		$headers=explode("\r\n",$data[0]);
		$this->assertEquals($headers[0],'HTTP/1.1 200 OK');
	}

	public function test_getAggregatedHealthStats(){
		$data=$this->curl('getAggregatedHealthStats/NJ','');
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getEthnicities(){
		$data=$this->curl('getEthnicities',['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getFood(){
		$data=$this->curl('getFood/'.self::$userfood_id,['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getFoodAll(){
		$data=$this->curl('getFoodAll/',['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 401 You do not have the rights to perform this action');
	}

	public function test_getFoodList(){
		$data=$this->curl('getFoodList/',['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getFoodUser(){
		$data=$this->curl('getFoodUser/'.self::$email,['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getHealthStatsA(){
		$post=['weight'=>220,'waist_size'=>36,'height'=>72,'gender'=>'M','state'=>'NJ','ethnicity'=>'Hisp','authtoken'=>self::$authtoken,'age'=>44];
		$data=$this->curl('getHealthStats/',$post);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getHealthStatsB(){
		$data=$this->curl('getHealthStats/'.self::$email,['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getUser(){
		$data=$this->curl('getUser/'.self::$email,['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getUserAll(){
		$data=$this->curl('getUserAll/',['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 401 You do not have the rights to perform this action');
	}

	public function test_getWorkout(){
		$data=$this->curl('getWorkout/'.self::$workout_id,['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_getWorkoutAll(){
		$data=$this->curl('getWorkoutAll/',['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 401 You do not have the rights to perform this action');
	}

	public function test_getWorkoutUser(){
		$data=$this->curl('getWorkoutUser/'.self::$email,['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}

	public function test_updateUser(){
		$post=['fname'=>'Bob','lname'=>'Smith','mi'=>'E','weight'=>220,'waist_size'=>36,'height'=>72,'birth_date'=>'1987-09-16T00:00:00Z','gender'=>'M','address1'=>'123 Easy Street','city'=>'Edison','state'=>'NJ','zip'=>'08854','ethnicity'=>'Hisp','authtoken'=>self::$authtoken];
		$data=$this->curl('updateUser/'.self::$email,$post);
		$headers=explode("\r\n",$data[0]);
		$this->assertEquals($headers[0],'HTTP/1.1 200 OK');
	}

	public function test_logoutUser(){
		$data=$this->curl('logoutUser/',['authtoken'=>self::$authtoken]);
		$x=explode("\r\n",$data[0]);
		$this->assertEquals($x[0],'HTTP/1.1 200 OK');
	}
}