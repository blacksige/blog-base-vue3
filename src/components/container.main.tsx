import { defineComponent, isProxy, isReactive, isRef, nextTick, onMounted, watch } from "vue";
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
require('echarts/lib/component/visualMap')

echarts.registerMap('全国', geoJson);

/* 全局变量 */
export default defineComponent({
    props: {
        isShowPie: {
            type: Boolean,
            default: false,
        },
        userInfo: {
            type: Object,
            default: () => {
                return {}
            }
        },
    },
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    setup(props, { emit }) {
        watch(
            props.userInfo,
            (newProps) => {
                console.log("userInfo changed.", newProps);
                backMap();
            },
            { deep: true }
        );

        // map实例
        let myChart: any = {};
        // 当前map名称
        let mapName = '全国';
        // 页面渲染
        const renderMap = (first = false) => {
            // const that = this as any;
            updateLoding(true)
            const bglist = props.userInfo.cityInfo || [];
            // 标签
            const legendData = props.userInfo.legendData || [];
            // 坐标
            const geoCoordMap: diyType = props.userInfo.geoCoordMap || {};
            // 数据
            const rawData = props.userInfo.rawData || [];
            setTimeout(() => {
                // console.log(bglist, legendData, geoCoordMap, rawData);
                setOption(first)
                updateLoding(false)
            }, 1500)
            function setOption(first: boolean) {
                first &&
                    window.addEventListener("resize", () => {
                        myChart.resize();
                    });

                const option: any = {
                    animation: true,
                    // 地图背景颜色
                    tooltip: {
                        trigger: "axis",
                    },
                    visualMap: {
                        min: 0,
                        max: 5000,
                        calculable: true,
                        seriesIndex: [0],
                        inRange: {
                            color: ['#4c91f7', '#004199'],
                        },
                        show: false,
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
                const rltSeriesObj = {
                    type: 'map',
                    map: mapName,
                    geoIndex: 0,
                    aspectScale: 0.75,
                    showLegendSymbol: false,
                    animation: true,
                    data: bglist,
                }
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
                        series: [rltSeriesObj],
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
                            emphasis: {
                                label: {
                                    show: true,
                                }
                            },
                        });
                    });

                    myChart.setOption(option);
                }
                if (props.isShowPie && rawData.length > 0 && legendData.length > 0 && Object.keys(geoCoordMap).length > 0) {
                    setTimeout(renderEachCity, 0);
                }
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
        // 展示对应的省
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
        // 展示对应市
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
        // 地区选择
        const setectCity = (name: string) => {
            showProvince(provinces[name], name)
        }
        // loding
        const updateLoding = (flag: boolean) => {
            emit('openFullScreen', flag)
        }

        onMounted(() => {
            myChart = echarts.init(document.getElementById("container"));
            renderMap(true);
        });

        const getProps = () => {
            console.log('getProps');
            console.log(
                isProxy(props.userInfo),
                isReactive(props.userInfo),
                isRef(props.userInfo)
            );
            
        }
        return {
            backMap,
            setectCity,
            getProps,
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