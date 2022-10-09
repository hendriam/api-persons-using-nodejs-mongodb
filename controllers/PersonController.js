exports.getAll = async (req, res) => {
    const _data = [];
    let stat = {
        message: "oke",
        data: _data,
    };

    console.log(`[Person] get data successfull => ${JSON.stringify(_data)}`);

    return res.status(200).send(stat);
};
