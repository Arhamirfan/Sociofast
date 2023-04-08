import React, { useState, useEffect } from 'react'
import influencerApi from '@/src/api/influencer';
import { toast } from 'react-hot-toast';
import Spinner from '@/src/components/spinner';
import Card from '@/src/components/card';
const InfluencerStatus = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ "Profession": 7, "Category": 8, "Platform": 6, "Influencer": 6, "Location": 10 });
  const [error, setError] = useState("")
  useEffect(() => {
    getInfluencerCount();
  }, [])

  let getInfluencerCount = async () => {
    try {
      setLoading(true);
      influencerApi.getAllInfluencer("").then((result) => {
        console.log('result', result);
        // if (result && result?.status == 200) {
        //   setData(result.data.data);
        // } else {
        //   console.log('else result: ', result);
        // }
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

  return (
    <>
      <div className='p-4'>

        <h4 className='grey largeBoldText boldText'>Overall status</h4>
        {!loading ? <>
          {data ? <>
            <div className='d-flex flex-row gap-3'>
              {Object.keys(data).map((key) => (
                <Card key={key} title={key} description={data[key]} />
              ))}
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

export default InfluencerStatus