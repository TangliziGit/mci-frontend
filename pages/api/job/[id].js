import jobSource from "../index";

export default (req, res) => {
    const { method } = req;

    switch (method) {
        case 'GET':
            res.status(200)
                .json({payload: jobSource[0]});
            break;
    }
}
