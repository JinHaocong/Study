import mockJS from "mockjs";

const userList = mockJS.mock({
    "data|100": [
        {
            name: "@cname", // 生成不同的中文名
            "id|+1": 1, // 自增
            time: "@time"
        }
    ]
})

export default [
    {
        method: "post",
        url: "/api/users",
        response: ({body}) => {

            return {
                code: 200,
                message: 'success',
                data: userList,
            }
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }
]
