var userService = require('./userService')

const getDataControllerfn = async (req, res) => {
    try {
        const visitors = await userService.getDataFromDBService();
        res.status(200).send(visitors);
    } catch (error) {
        console.error('Error retrieving data:', error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};

 const createUserControllerfn = async (req, res) => {
    try{
        const status = await userService.createUserDBService(req.body);

        if(status){
            res.status(201).send({"status": true, "message": "User Created Successfully"});
        } else {
            res.status(500).send({"staus": false, "message": "Error creating user"});
        }
    } catch(error){
        console.error('Error creating User: ', error);
        res.status(500).send({"status": false, "message": "Internal Server Error"});
    }
 };
 
 const updateUserControllerfn = async (req, res) => {
    try {
        console.log(req.params.id);
        console.log(req.body);

        const result = await userService.updateUserDBService(req.params.id, req.body);

        if (result) {
            res.status(200).send({ "status": "success", "message": "User Updated" });
        } else {
            res.status(404).send({ "status": "error", "message": "User not found" });
        }
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).send({ "status": "error", "message": "Internal Server Error" });
    }
};


const deleteUserControllerfn = async (req, res) => {
    try {
        const userId = req.params.id;

        const result = await userService.deleteUserDBService(userId);

        if (result) {
            res.status(200).send({ "status": true, "message": "User deleted successfully" });
        } else {
            res.status(404).send({ "status": false, "message": "User not found" });
        }
    } catch (error) {
        console.error('Error in deleteUserControllerFn:', error);
        res.status(500).send({ "status": false, "message": "Internal Server Error" });
    }
};


module.exports = {getDataControllerfn, createUserControllerfn, updateUserControllerfn, deleteUserControllerfn};
