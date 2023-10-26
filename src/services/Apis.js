import { commonrequest } from "./ApiCall"
import { BASE_URL } from "./helper"


// Inventory 
export const registerfunc = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/add`, data, header);
}


export const usergetfunc = async (search, page, { selectedMonth, selectedYear }) => {
    let url = `${BASE_URL}/user/details?search=${search}&page=${page}`;

    if (selectedMonth && selectedYear) {
        url += `&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`;
    }

    try {
        const response = await commonrequest("GET", url);
        return response;
    } catch (error) {
        throw error;
    }
};
export const singleUsergetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/user/${id}`, "");
}

export const editfunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/user/edit/${id}`, data);
}


export const deletfunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/user/delete/${id}`, {});
}


// signin and signup
export const signinfunction = async (data) => {

    return await commonrequest("POST", `${BASE_URL}/user/signin`, data)
}
export const resisterfunction = async (data, header) => {
    return await commonrequest("POST", `${BASE_URL}/user/resister`, data, header)
}


// Acounts
export const accountsregisterfunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/account/add`, data);

}


export const accountusergetfunc = async (search, page, { selectedMonth, selectedYear }) => {
    let url = `${BASE_URL}/account/details?search=${search}&page=${page}`;

    if (selectedMonth && selectedYear) {
        url += `&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`;
    }

    try {
        const response = await commonrequest("GET", url);
        return response;
    } catch (error) {
        throw error;
    }
};

export const accountdeletfunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/account/delete/${id}`, {});
}
export const singleAccountgetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/account/${id}`, "");
}

export const accountEditfunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/account/edit/${id}`, data);
}



// Employee
export const employeegetfunc = async (search, page, { selectedMonth, selectedYear }) => {
    let url = `${BASE_URL}/employee/details?search=${search}&page=${page}`;

    if (selectedMonth && selectedYear) {
        url += `&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`;
    }

    try {
        const response = await commonrequest("GET", url);
        return response;
    } catch (error) {
        throw error;
    }
};


export const employeedeletfunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/employee/delete/${id}`, {});
}
export const employeeregisterfunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/employee/add`, data);

}
export const employeeEditfunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/employee/edit/${id}`, data);
}
export const singleEmployeegetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/employee/${id}`, "");
}

// customer

export const customergetfunc = async (search, page, { selectedMonth, selectedYear }) => {

    let url = `${BASE_URL}/customer/details?search=${search}&page=${page}`;

    if (selectedMonth && selectedYear) {
        url += `&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`;
    }

    try {
        const response = await commonrequest("GET", url);
        return response;
    } catch (error) {
        throw error;
    }
};

export const customerdeletfunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/customer/delete/${id}`, {});
}
export const customerregisterfunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/customer/add`, data);

}
export const customerEditfunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/customer/edit/${id}`, data);
}
export const singlecustomergetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/customer/${id}`, "");
}

// appointment

export const appointmentgetfunc = async (search, page, { selectedMonth, selectedYear }) => {

    let url = `${BASE_URL}/appointment/details?search=${search}&page=${page}`;

    if (selectedMonth && selectedYear) {
        url += `&selectedMonth=${selectedMonth}&selectedYear=${selectedYear}`;
    }

    try {
        const response = await commonrequest("GET", url);
        return response;
    } catch (error) {
        throw error;
    }
};



export const appointmentdeletfunc = async (id) => {
    return await commonrequest("DELETE", `${BASE_URL}/appointment/delete/${id}`, {});
}
export const appointmentregisterfunc = async (data) => {
    return await commonrequest("POST", `${BASE_URL}/appointment/add`, data);

}
export const appointmentEditfunc = async (id, data) => {
    return await commonrequest("PUT", `${BASE_URL}/appointment/edit/${id}`, data);
}
export const singleappointmentgetfunc = async (id) => {
    return await commonrequest("GET", `${BASE_URL}/appointment/${id}`, "");
}


