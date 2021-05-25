import axios from 'axios';
import { serverUrl } from '../config';

export const getThemes = () => axios.get(`${serverUrl}/themes/!findAll`)
    .then((res) => {
        if (res.data) return res.data;
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const getTest = (testId) => axios.get(`${serverUrl}/tests/${testId}`)
    .then((res) => {
        if (res.data) return res.data;
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const getTestsByThemeId = (themeId) => axios({
    method: 'post',
    url: `${serverUrl}/tests/!findAllByThemeId`,
    data: {
        themeId
    }
})
    .then((res) => {
        if (res.data) return res.data;
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const getResultsByUserId = (userId) => axios({
    method: 'post',
    url: `${serverUrl}/testResults/!findAllByUserId`,
    data: {
        userId
    }
})
    .then((res) => {
        if (res.data) return res.data;
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const getQuestionsByTestId = (testId) => axios({
    method: 'post',
    url: `${serverUrl}/questions/!findAllByTestId`,
    data: {
        testId
    }
})
    .then((res) => {
        if (res.data) return res.data;
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const addTheme = (name) => axios({
    method: 'post',
    url: `${serverUrl}/themes`,
    data: {
        name
    }
})
    .then((res) => {
        if (res.data) {
            return res.data;
        }
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const addTest = (name, themeId, timeLimit, passScore) => axios({
    method: 'post',
    url: `${serverUrl}/tests`,
    data: {
        name,
        themeId,
        timeLimit,
        passScore
    }
})
    .then((res) => {
        if (res.data) {
            return res.data;
        }
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const deleteTest = (id) => axios({
    method: 'delete',
    url: `${serverUrl}/tests/${id}`
})
    .then((res) => {
        if (res.data) {
            return true;
        }
        throw new Error('Delete failed');
    })
    .catch((err) => {
        console.log(err);
    });

export const addQuestion = (question, testId, questionNumber, answers) => axios({
    method: 'post',
    url: `${serverUrl}/questions`,
    data: {
        question,
        testId,
        questionNumber,
        answers
    }
})
    .then((res) => {
        if (res.data) {
            return res.data;
        }
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const addTestResult = (question, testId, questionNumber, answers) => axios({
    method: 'post',
    url: `${serverUrl}/testResults/`,
    data: {
        question,
        testId,
        questionNumber,
        answers
    }
})
    .then((res) => {
        if (res.data) {
            return res.data;
        }
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const updateQuestion = (id, question, testId, questionNumber, answers) => axios({
    method: 'put',
    url: `${serverUrl}/questions/${id}`,
    data: {
        question,
        testId,
        questionNumber,
        answers
    }
})
    .then((res) => {
        if (res.data) {
            return res.data;
        }
        return null;
    })
    .catch((err) => {
        console.log(err);
    });

export const deleteQuestion = (id) => axios({
    method: 'delete',
    url: `${serverUrl}/questions/${id}`
})
    .then((res) => {
        if (res.data) {
            return true;
        }
        throw new Error('Delete failed');
    })
    .catch((err) => {
        console.log(err);
    });
