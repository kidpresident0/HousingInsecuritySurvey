<!doctype html>
<html>
  <head>
    <title>Survey Response</title>
	<script>
	
	var answers = <?php echo urldecode($_POST['answers']); ?>;
	console.log(answers);
	</script>
	</head>
	<body>
	 <h1>Thank you for completing the survey!</h1>
	 <p>Here is a summary of your responses: </p>
	 <div id="responseTable"> // Table has not been implemented.
	</body>
</html>
	
