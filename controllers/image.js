import Clarifai from 'clarifai';
const app = new Clarifai.App({
 apiKey: 'cdd8ecdfee774c51bf079190083fa77d'
});
export const handleAPICall = (req, res) => {
	app.models.predict(
    /**"53e1df302c079b3db8a0a36033ed2d15"**/
    Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then( data => res.json(data))
    .catch( err => res.status(400).json('API failure!'));
}
export const handleImage = (req, res, db) => {
	const { id } = req.body;

	db('users')
	.where({ id:id })
	.increment({entries: 1})
	.returning('entries')
	.then( entry => res.json(entry[0]))
	.catch( err => res.status(400).json('Error fetching image count'));

};