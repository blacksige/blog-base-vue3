module.exports = {
    getUniqueId: () => {
        const xxList = ['0', '1'];
        const nowData = Number(String(new Date().valueOf()).slice(3)).toString(2);
        const len = 40 - nowData.length;

        let num = '1';
        let num2 = '1';

        for (let i = 0; i < len.length; i++) {
            num += xxList[Math.round(Math.random())];
        }
        for (let j = 0; j < len.length; j++) {
            num2 += xxList[Math.round(Math.random())];
        }

        const id = parseInt(num2, 2).toString(16) + parseInt(num + nowData, 2).toString(16);
        return id;
    }
}