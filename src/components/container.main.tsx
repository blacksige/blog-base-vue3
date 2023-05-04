import { defineComponent, nextTick, onMounted } from "vue";
import { provinces, cityMap } from "./config/main";
import { diyType, option } from "../utils/type"
import geoJson from '../utils/china.json';
const echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/map');
require('echarts/lib/chart/pie');
require('echarts/lib/component/tooltip')
require('echarts/lib/component/grid')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
echarts.registerMap('全国', geoJson);

/* 全局变量 */
export default defineComponent({
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setup(props, { emit }) {
        // map实例
        let myChart: any = {};
        // 当前map名称
        let mapName = '全国';
        //标签
        const legendData = ["在办工单量", "已办工单量", "其他"];
        // 坐标
        const geoCoordMap: diyType = {
            北京: [116.41667, 39.91667],
            上海: [121.43333, 34.5],
            广州: [113.23333, 23.16667],
            杭州: [120.2, 30.26667],
            重庆: [106.45, 29.56667],
            青岛: [120.33333, 36.06667],
            厦门: [118.1, 24.46667],
            福州: [119.3, 26.08333],
            兰州: [103.73333, 36.03333],
            长沙: [113.0, 28.21667],
            南京: [118.78333, 32.05],
        };
        // 数据
        const rawData = [
            ["北京", 5, 20, 30],
            ["上海", 10, 10, 30],
            ["广州", 10, 50, 30],
            ["杭州", 10, 20, 3],
            ["重庆", 10, 20, 8],
            ["青岛", 10, 20, 10],
            ["厦门", 10, 20, 4],
            ["福州", 10, 10, 30],
            ["兰州", 10, 15, 30],
            ["长沙", 10, 25, 30],
            ["南京", 10, 20, 5],
        ];


        const renderMap = (first = false) => {
            // const that = this as any;
            updateLoding(true)
            setTimeout(() => {
                setOption(first)
                updateLoding(false)
            }, 1500)
            function setOption(first: boolean) {
                first &&
                    window.addEventListener("resize", () => {
                        myChart.resize();
                    });

                const option = {
                    animation: true,
                    // 地图背景颜色
                    tooltip: {
                        trigger: "axis",
                    },
                    geo: {
                        map: mapName,
                        // silent: true,
                        roam: false,
                        aspectScale: 0.75,
                        zoom: 0.9, // 地图初始大小
                        // center: [105.366794, 35.400309], // 初始中心位置
                        label: {
                            normal: {
                                show: true,
                                fontSize: "12",
                                color: "#D6D6F0",
                            },
                        },
                        // 地区块儿颜色
                        itemStyle: {
                            normal: {
                                areaColor: "#4c91f7",
                                borderWidth: 1,
                                borderColor: "#1670d3",
                                shadowColor: "#004199",
                                shadowBlur: 15,
                                shadowOffsetX: 3,
                                shadowOffsetY: 5,
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                },
                            },
                        },
                    },
                    grid: {
                        left: "5%",
                        top: "5%",
                    },
                    series: [],
                };

                function renderEachCity() {
                    const option: option = {
                        title: [],
                        grid: [],
                        legend: {
                            x: "12%",
                            y: "85%",
                            orient: "vertical",
                            icon: "circle",
                            data: legendData,
                            textStyle: {
                                color: "rgba(249, 249, 249, .7)"
                            }

                        },
                        series: [],
                    };

                    echarts.util.each(rawData, function (dataItem: any[], idx: string) {
                        const geoCoord = geoCoordMap[dataItem[0]];
                        const coord = myChart.convertToPixel("geo", geoCoord);
                        idx += "";
                        const inflationData = legendData.map((item: any, index: number) => {
                            return {
                                name: item,
                                value: dataItem[index + 1],
                            };
                        });
                        const total = dataItem[1] + dataItem[2] + dataItem[3];
                        // let title = {
                        //   text: dataItem[0],
                        //   textStyle: {
                        //     fontSize: 10,
                        //     fontWeight: 'bold',
                        //   },
                        //   x: coord[0] - 15,
                        //   y: coord[1] + 15,
                        // };
                        // option.title.push(title);
                        option.grid.push({
                            id: idx,
                            gridId: idx,
                            width: 30,
                            height: 40,
                            left: coord[0] - 15,
                            top: coord[1] - 15,
                            z: 100,
                        });
                        option.series.push({
                            id: idx,
                            type: "pie",
                            label: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: true,
                                },
                            },
                            lableLine: {
                                normal: {
                                    show: false,
                                },
                                emphasis: {
                                    show: true,
                                },
                            },
                            radius:
                                total > 50 ? "4%" : total > 40 ? "3%" : total > 30 ? "2%" : "1%",
                            center: coord,
                            data: inflationData,
                            z: 100,
                            itemStyle: {
                                normal: {
                                    color: function (params: any) {
                                        // 柱状图每根柱子颜色
                                        const colorList = ["#FF8A54", "#F3E5A2", "#00EAFF"];
                                        return colorList[params.dataIndex];
                                    },
                                },
                            },
                        });
                    });
                    myChart.setOption(option);
                }
                setTimeout(renderEachCity, 0);

                myChart.setOption(option);

                // 点击触发
                first &&
                    myChart.on("click", (param: any) => {
                        if (param.name in provinces) {
                            // 处理省模块
                            const names = param.name;
                            for (const key in provinces) {
                                if (names == key) {
                                    showProvince(provinces[key], key);
                                    break;
                                }
                            }
                        } else if (param.name in cityMap) {
                            // 处理市模块
                            const names = param.name;
                            for (const key in cityMap) {
                                if (names == key) {
                                    showCitys(cityMap[key], key);
                                    break;
                                }
                            }
                        }
                    });
            }
        }

        //展示对应的省
        const showProvince = (eName: number, param: any) => {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        const resData = xmlhttp.responseText;
                        echarts.registerMap(param, resData);
                        mapName = param;
                        renderMap();
                    } else if (xmlhttp.status == 400) {
                        alert("There was an error 400");
                    } else {
                        alert("something else other than 200 was returned");
                    }
                }
            };
            xmlhttp.open("GET", `/map/province/${eName}.geoJson`, true);
            xmlhttp.send();
        }

        //展示对应市
        const showCitys = (cName: number, param: any) => {
            const xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function () {
                if (xmlhttp.readyState == XMLHttpRequest.DONE) {
                    if (xmlhttp.status == 200) {
                        const resData = xmlhttp.responseText;
                        echarts.registerMap(param, resData);
                        mapName = param;
                        renderMap();
                    } else if (xmlhttp.status == 400) {
                        alert("There was an error 400");
                    } else {
                        alert("something else other than 200 was returned");
                    }
                }
            };

            xmlhttp.open("GET", `/map/city/${cName}.geoJson`, true);
            xmlhttp.send();
        }

        // 返回全国视图
        const backMap = async () => {
            await nextTick()
            mapName = "全国";
            console.log(mapName);
            renderMap();
        }

        const updateLoding = (flag: boolean) => {
            emit('openFullScreen', flag)
        };

        onMounted(() => {
            myChart = echarts.init(document.getElementById("container"));
            renderMap(true);
        });

        return {
            backMap,
        }
        // return (): JSX.Element => {
        //     return <div id="container" style={{ width: "100%", height: '100%' }}></div>
        // }
    },
    render() {
        return (
            <div id="container" style={{ width: "100%", height: '100%' }}></div>
        )
    }
})