import React, { useState, useEffect } from 'react'
import influencerApi from '@/src/api/influencer';
import { toast } from 'react-hot-toast';
import Spinner from '@/src/components/spinner';
import Card from '@/src/components/card';
import Table from './influencerTable';
import TableDataFilter from '@/src/components/modals/tableDataFilter';
const InfluencerMain = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState();
    const [tableData, setTableData] = useState();
    const [queryParams, setQueryParams] = useState("")
    const [columnData, setColumnData] = useState([]);
    let [showFilterModal, setShowFilterModal] = useState(false);
    const [columnRemovedData, setColumnRemovedData] = useState([]);
    const [error, setError] = useState("")
    let oneTimeUsed = false;
    useEffect(() => {
        if (!oneTimeUsed)
            getInfluencerCount("");
    }, [])

    let getInfluencerCount = async (params) => {
        try {
            setLoading(true);
            oneTimeUsed = true;
            influencerApi.getInfluencerByFilter(params).then((result) => {
                console.log('result', result);
                if (result && result?.status == 200) {
                    if (result.data.content.length > 0) {
                        let tableFilteredData = [];
                        setData(result?.data?.content);
                        result?.data?.content?.map((values) => {
                            let { id, name, profileUrl, description, followers, likes, comments, engagement, shares, gender, double_checked, profession, location, category, platform, type } = values;
                            let professionName = profession.professionName;
                            let locationName = location.locationName;
                            let categoryName = category.categoryName;
                            let platformName = platform.platformName;
                            let typeName = type.typeName;
                            tableFilteredData.push({ id, name, description, followers, likes, comments, engagement, shares, gender, professionName, locationName, categoryName, platformName, typeName })
                        })
                        console.log("🚀 ~ influencerApi.getInfluencerByFilter ~ tableFilteredData:", tableFilteredData)
                        setTableData(tableFilteredData);
                        let firstIndexData = result?.data?.content[0];
                        const keys = Object.keys(firstIndexData);
                        const tableColumnData = keys.filter(key => typeof firstIndexData[key] !== 'object');
                        const modifiedArray = tableColumnData.filter(item => item !== "profileUrl" && item !== "double_checked");
                        console.log("🚀 ~ influencerApi.getInfluencerByFilter ~ tableColumnData:", modifiedArray)
                        setColumnData(modifiedArray);
                    }
                } else {
                    console.log('else result: ', result);
                }
                setLoading(false);
            }).catch((error) => {
                console.log("🚀 ~ file: influencerStatus.js:21 ~ useEffect ~ error:", error)
                setLoading(false);
                setError(error.message);
                toast.error(error.message);
            });
        } catch (error) {
            console.log("🚀 ~ file: influencerStatus.js:10 ~ useEffect ~ error:", error.message)
            toast.error(error.message);
            setError(error.message);
        }
    }

    const handleRemove = (index) => {
        setColumnData((prev) => {
            const newArray = [...prev];
            let removedData = newArray.splice(index, 1);
            console.log('toRemove:', removedData[0])
            setColumnRemovedData([...columnRemovedData, removedData[0]])
            return newArray;
        });
    };
    const handleAdd = (item, index) => {
        console.log('toAdd:', item, ', index:', index)
        setColumnRemovedData((prev) => {
            const newArray = [...prev];
            let removedData = newArray.splice(index, 1);
            console.log('toRemove:', removedData[0])
            setColumnData([...columnData, removedData[0]])
            return newArray;
        });
    };



    return (
        <>
            <div className='p-4 font'>
                <div className='d-flex flex-column flex-sm-row justify-content-between'>
                    <h2>Influencer</h2>
                    <div>
                        <button className='btn btn-danger me-2' onClick={() => { setShowFilterModal(true) }}>filters</button>
                        <button className='btn btn-primary'>Create new record</button>
                    </div>
                </div>
                <TableDataFilter show={showFilterModal} setShowFilterModal={setShowFilterModal} getInfluencerCount={getInfluencerCount} onHide={() => setShowFilterModal(false)} />
                <div className="card fullWidth my-4">
                    <div className="card-body ">
                        <div className='normalLgText semibold'>Selected influencer values</div>
                        <div className='p-2'>
                            {columnData.map((item, index) => (
                                <button
                                    key={index}
                                    className="btn btn-primary m-1"
                                    onClick={() => handleRemove(index)}
                                >
                                    {item}
                                    <span className="ms-2" aria-hidden="true">
                                        &times;
                                    </span>
                                </button>
                            ))}
                        </div>
                        <div className='pt-3'>
                            <div className='normalLgText semibold'>Removed influencer values</div>
                            <div className='p-2'>
                                {columnRemovedData.map((item, index) => (
                                    <button
                                        key={index}
                                        className="btn btn-danger m-1"
                                        onClick={() => handleAdd(item, index)}
                                    >
                                        {item}
                                        <span className="ms-2" aria-hidden="true">
                                            +
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                {!loading ? <>
                    {data ? <>
                        <div className='mt-3'>
                            <Table data={tableData} visibleFields={columnData} />
                        </div>

                    </> : <div className='text-center'>
                        {error ? <>{error}</> : <>No data found</>}
                    </div>}
                </> : <>
                    <Spinner />
                </>}

            </div>
        </>
    )
}

export default InfluencerMain