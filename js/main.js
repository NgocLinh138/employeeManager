class Employee {
    constructor(id, fullname, age, phoneNumber, address) {
        this.id = id;
        this.fullname = fullname;
        this.age = age;
        this.phoneNumber = phoneNumber;
        this.address = address;
    }
}

const create = () => {
    let fullname = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let phoneNumber = document.getElementById("phone").value;
    let address = document.getElementById("address").value;
    let employee = new Employee(-1, fullname, age, phoneNumber, address);
    axios({
        url: "http://61ed1641f3011500174d22ad.mockapi.io/Employee",
        method:"POST",
        data: employee,
    }).then(
        (response) => {
            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("address").value = "";
            Swal.fire(
                "Thông báo!",
                "Thêm thành công " + fullname + " !",
                "success"
            );
            retrive();
        }
    ).catch(
        (error) => {
            console.log(error);
        }
    );
};

const retrive = () => {
    axios({
        url: "http://61ed1641f3011500174d22ad.mockapi.io/Employee",
        method: "GET",
    }).then((response) => {
        renderData(response.data);
    }).catch((error) => {
        console.log(error);
    });
};

const renderData = (data) => {
    const bodyTag = document.getElementById("body");
    let bodyInnerHTML = '';
    data.forEach((item) => {
        let {id, fullname, age, phoneNumber, address} = item;
        let itemHTML = `
        <tr>
            <td>${id}</td>
            <td>${fullname}</td>
            <td>${age}</td>
            <td>${phoneNumber}</td>
            <td>${address}</td>
        </tr>
        `;
        bodyInnerHTML += itemHTML;
    });
    bodyTag.innerHTML = bodyInnerHTML;
};

document.getElementById("search").addEventListener("input", (e) => {
    let keyWord = e.target.value;
    axios({
        url: "http://61ed1641f3011500174d22ad.mockapi.io/Employee",
        method:"GET"
    }).then(
        (response) => {
        let fullData = response.data
        let dataFilter = fullData.filter(item => item.fullname.toLowerCase().includes(keyWord.toLowerCase()))
        renderData(dataFilter)
       }
    ).catch((error) => {
        console.log(error);
    });
});

document.getElementById("button").addEventListener('click', () => {
    create();
});

retrive();
