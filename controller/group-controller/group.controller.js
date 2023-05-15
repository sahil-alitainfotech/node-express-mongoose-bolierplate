const { RESPONSE_PAYLOAD_STATUS_SUCCESS,
    RESPONSE_STATUS_CODE_OK,
    RESPONSE_PAYLOAD_STATUS_ERROR,
    RESPONSE_STATUS_CODE_NOT_FOUND,
    RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
    RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR,
    AUTH_USER_DETAILS } = require("../../constants/global.constants")
const { GROUP_MRSSAGES } = require("../../controller-messages/group.messages")
const { getCurrentLoginUser } = require("../../helpers/fn")
const Group = require("../../schema/group.schema")

// create group

const createGroup = async (req, res) => {
    try {
        const { title } = req.body
        const slug = title.trim().toLowerCase().replace(/\s+/g, '-')
        const user = await getCurrentLoginUser(req)
        const group = await Group.create({
            title: title,
            slug: slug,
            user: user
        })
        if (group) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: GROUP_MRSSAGES.GROUP_CREATED,
                data: group,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: GROUP_MRSSAGES.GROUP_NOT_CREATED,
            };
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// update group by id

const updateGroup = async (req, res) => {

    try {
        const { id } = req.params
        const { _id } = req[AUTH_USER_DETAILS]
        const { title } = req.body
        const slug = title.trim().toLowerCase().replace(/\s+/g, '-')
        const user = await getCurrentLoginUser(req)
        const updateGroup = await Group.findByIdAndUpdate(id, {
            title: title,
            slug: slug,
            user: user,
            updated_by: _id,
        }, { new: true })
        if (updateGroup) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: GROUP_MRSSAGES.GROUP_UPDATED,
                data: updateGroup,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: GROUP_MRSSAGES.GROUP_NOT_UPDATED,
            };
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// delete group find by id and update

const deleteGroup = async (req, res) => {
    try {
        const { id } = req.params
        const { _id } = req[AUTH_USER_DETAILS]
        const deleteGroup = await Group.findByIdAndUpdate(id, {
            is_deleted: true,
            deleted_by: _id,
            updated_by: _id,
        })
        if (deleteGroup) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: GROUP_MRSSAGES.GROUP_DELETED,
                data: deleteGroup,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: GROUP_MRSSAGES.GROUP_NOT_DELETED,
            };
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        };
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

// delete group find by id and delete

const deleteGroupById = async (req, res) => {
    try {
        const { id } = req.params
        const deleteGroupById = await Group.findByIdAndDelete(id)
        if (deleteGroupById) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: GROUP_MRSSAGES.GROUP_DELETED,
                data: deleteGroupById,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: GROUP_MRSSAGES.GROUP_NOT_DELETED,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}


// get group by id

const getGroup = async (req, res) => {
    try {
        const { id } = req.params
        const group = await Group.findById(id)
        if (group) {
            const groupObj = group.toJSON()
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: GROUP_MRSSAGES.GROUP_FOUND,
                data: groupObj,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: GROUP_MRSSAGES.GROUP_NOT_FOUND,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}


// get all group

const getAllGroup = async (req, res) => {
    try {
        const user = await getCurrentLoginUser(req)
        const group = await Group.aggregate([
            { $match: { user: user } },
            {
                $lookup: {
                    from: 'users',
                    localField: 'user',
                    foreignField: '_id',
                    as: 'user'
                }
            },
            {
                $unwind: '$user'
            },
        ])
        if (group) {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_SUCCESS,
                message: GROUP_MRSSAGES.GROUP_FOUND,
                data: group,
                error: null,
            }
            return res.status(RESPONSE_STATUS_CODE_OK).json(responsePayload);
        }
        else {
            const responsePayload = {
                status: RESPONSE_PAYLOAD_STATUS_ERROR,
                message: null,
                data: null,
                error: GROUP_MRSSAGES.GROUP_NOT_FOUND,
            }
            return res.status(RESPONSE_STATUS_CODE_NOT_FOUND).json(responsePayload);
        }
    }
    catch (err) {
        const responsePayload = {
            status: RESPONSE_PAYLOAD_STATUS_ERROR,
            message: null,
            data: null,
            error: RESPONSE_STATUS_MESSAGE_INTERNAL_SERVER_ERROR,
        }
        return res.status(RESPONSE_STATUS_CODE_INTERNAL_SERVER_ERROR).json(responsePayload);
    }
}

module.exports = {
    createGroup,
    updateGroup,
    deleteGroup,
    deleteGroupById,
    getGroup,
    getAllGroup
}