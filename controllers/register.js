export const handleRegister = (req, res, db, bcrypt, saltRounds) => {
	const { name, email, pswd} = req.body;
	if (!name || !email || !pswd) {
	 alert("Fill all fields");	
	 return res.status(400).json('Invalid detials');
	}

	const hash = bcrypt.hashSync(pswd, saltRounds);

	db.transaction( trx => {
		trx.insert({
			hash: hash,
			email: email
		})
		.into('login')
		.returning('email')
		.then( loginEmail => {
			return trx('users')
			.returning('*')
			.insert({
				"name": name,
				"email": loginEmail[0],
				"joined": new Date()		
			})
			.then(user => {
				res.json(user[0]);
			})		
		})
		.then(trx.commit)
		.catch(trx.rollback);
	})
	.catch(err => res.status(400).json("Error registering the user. Duplicate data."));
	
};
