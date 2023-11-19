var userModel = require('./userModel');

module.exports.getDataFromDBService = () => {
    return userModel.find({})
    .then(result => {
        return result;
    })
    .catch(err => {
        throw err;
    })
}

module.exports.createUserDBService = (userDetails) => {
    const userModelData = new userModel({
        first_name: userDetails.first_name,
        last_name: userDetails.last_name,
        email: userDetails.email,
        phone: userDetails.phone,
    });

    return userModelData.save()
    .then(res => {
        return true;
    })
    .catch(err => {
        console.error("Error creating user:", err);
        return false;
    });
}

module.exports.updateUserDBService = (id, userDetails) => {
    return userModel.findByIdAndUpdate(id, userDetails, {new:true})
    .then(result => {
        console.log('User details updated:', result);
        return true;
    })
    .catch(err =>{
        console.error('Error updating user:', err);
        return false;
    })
}

module.exports.deleteUserDBService = (id) => {
    return userModel.findByIdAndDelete(id)
    .then(res => {
        if(res){
         console.log('User Deleted Successfully');
         return true;
        } else{
            console.log('User Not Found');
        }
    })
    .catch(err => {
        console.error('Error Deleting user', err);
        return false;
    })
}