<?php

$is_valid = TRUE;
$required = array('nombre', 'telefono', 'opcion', 'mensaje');
$validation_errors = '';

foreach($required as $value) {
	if(!isset($_POST[$value]) || $_POST[$value] === '') {
		$is_valid = FALSE;
		$validation_errors .= '<p><i class="fa fa-warning"></i> El campo '.ucfirst($value). ' es obligatorio</p>';
	}
}

if($is_valid) {
	$to  = 'gpais@ncomunicaciones.com';
	$subject = 'Contáctenos Colegio San Martin de Porres';
	$message = '<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<title>Contáctenos Colegio San Martin de Porres</title>
		</head>
		<body>
		<table width="600" style="font:12px/1.3 Trebuchet MS, Arial, Helvetica, sans-serif; margin:0 auto; border:10px solid #103a76;" cellspacing="0" border="0">
			<tr>
				<td width="20"></td>
				<td height="128" valign="middle"><img height="98" src="http://ncom.pe/proy/gabel_1/images/logo.png" alt="Colegio San Martin de Porres"></td>
				<td width="20"></td>
			</tr>
			<tr><td height="10" colspan="3"></td></tr>
			<tr>
				<td></td>
				<td>
					<p>
						Han hecho una consulta sobre el servicio de <strong>'.$_POST['servicio'].'</strong>
						a través de la web del Colegio San Martin de Porres.<br>
						A continuación los contenidos del mensaje:
					</p>
					<p><strong>'.nl2br($_POST['mensaje']).'</strong></p>
					<hr>
					<p><strong>Datos de contacto</strong></p>
					<p>Correo: <a href="mailto:'.$_POST['correo'].'">'.$_POST['correo'].'</a></p>
				</td>
				<td></td>
			</tr>
			<tr><td height="20" colspan="3"></td></tr>
			<tr>
				<td></td>
				<td>
					Atentamente,<br>
					<span style="color:#0078C1;">
						Colegio San Martin de Porres
					</span>			
				</td>
				<td></td>
			</tr>
			<tr><td height="20" colspan="3"></td></tr>
		</table>
		</body>
	</html>';
	// message for the client
	$message_client = '<html>
		<head>
			<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
			<title>Contáctenos Colegio San Martin de Porres</title>
		</head>
		<body>
		<table width="600" style="font:12px/1.3 Trebuchet MS, Arial, Helvetica, sans-serif; margin:0 auto; border:10px solid #103a76;" cellspacing="0" border="0">
			<tr>
				<td width="20"></td>
				<td height="128" valign="middle"><img height="98" src="http://ncom.pe/proy/gabel_1/images/logo.png" alt="Colegio San Martin de Porres"></td>
				<td width="20"></td>
			</tr>
			<tr><td height="10" colspan="3"></td></tr>
			<tr>
				<td></td>
				<td>
					<p>
						Hemos recibido su información exitosamente,
						estaremos respondiendo su mensaje a la brevedad posible.
					</p>
					<p><strong>Mensaje</strong></p>
					<p>'.nl2br($_POST['mensaje']).'</p>
				</td>
				<td></td>
			</tr>
			<tr><td height="20" colspan="3"></td></tr>
			<tr>
				<td></td>
				<td>
					Atentamente,<br>
					<span style="color:#0078C1;">
						Colegio San Martin de Porres
					</span>			
				</td>
				<td></td>
			</tr>
			<tr><td height="20" colspan="3"></td></tr>
		</table>
		</body>
	</html>';
	
	$headers   = array();
	$headers[] = "MIME-Version: 1.0";
	$headers[] = "Content-type: text/html; charset=utf-8";
	$headers[] = "From: noreply@example.com";
	$headers[] = "X-Mailer: PHP/".phpversion();
	
	if(@mail($to, $subject, $message, implode("\r\n", $headers))) {
		@mail($_POST['correo'], $subject, $message_client, implode("\r\n", $headers));
	}
	else {
		echo '<p><i class="fa fa-wrench"></i> Lo sentimos.<br>No se pudieron enviar sus datos debido a un problema con el servidor.</p>';
	}
}
else {
	echo $validation_errors;	
}

// End of file