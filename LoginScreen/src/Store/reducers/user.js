import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { getKeyClockToken_Data, getUserProfile, setLastLoginAttempted } from "../../utils/storage"
import fetchClient from "../../utils/axiosConfig"
import jwt_decode from "jwt-decode";
import constants from "../../utils/constants"

const token_data = getKeyClockToken_Data();
const userData = token_data ? jwt_decode(token_data) : undefined;
const userProfile = getUserProfile()

//_____________ temporary until api support is available
function saveTimeline(timeline) {
    localStorage.setItem("exp_timeline_data", JSON.stringify(timeline))
}

function getTimeline() {
    let timeline = localStorage.getItem("exp_timeline_data")
    if (timeline) return JSON.parse(timeline)
    else return {
        about_you: false,
        country_selection: false,
        employee_info: false,
        add_user: false
    }
}
//_____________

export const updateLastLogin = createAsyncThunk(
    "user/updateLastLogin",
    async (payload = {}) => {
        let res = await fetchClient
            .put(`${constants.API.USER.UPDATE_LAST_LOGIN}${payload.user_id}`)
            .catch(console.error)
        return res
    }
)

const user = createSlice({
    name: "user",
    initialState: {
        loading: false,
        timeline: getTimeline(),
        userProfile: userProfile,
        userData: userData
    },
    reducers: {
        setAboutYou: (state, isAboutYou) => {
            state.timeline.about_you = isAboutYou
            saveTimeline(state.timeline)
        },
        setCountrySelection: (state, isCountrySelection) => {
            state.timeline.country_selection = isCountrySelection
            saveTimeline(state.timeline)
        },
        setEmployeeInfo: (state, isEmployeeInfo) => {
            state.timeline.employee_info = isEmployeeInfo
            saveTimeline(state.timeline)
        },
        setAddUser: (state, isAddUser) => {
            state.timeline.add_user = isAddUser
            saveTimeline(state.timeline)
        },
        setUserData: (state, userData) => {
            state.userData = userData
        },
        setUserProfile: (state, userProfile) => {
            state.userProfile = userProfile.payload
        }
    },
    extraReducers: {
        [updateLastLogin.fulfilled]: (state, action) => {
            setLastLoginAttempted()
        }
    }
})

export const {
    setAboutYou, setCountrySelection, setEmployeeInfo, setAddUser,
    setUserData, setUserProfile
} = user.actions

export default user.reducer