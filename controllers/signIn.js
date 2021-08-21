export const handleSignin = (req, res, db, bcrypt) => {

	db.select('email', 'hash').from('login')
	.where({email: req.body.email})
	.then( data => {
		let isValid = bcrypt.compareSync( req.body.pswd, data[0].hash );
		if(isValid){
			return db.select('*').from('users')
				.where({email: req.body.email})
				.then( user => res.json(user[0]))
				.catch( err => res.status(400).json("No such user found"));
		}else{
			res.status(400).json("Invalid credentials")
		}
	})
	.catch( err => res.status(400).json("Invalid credentials"));

}