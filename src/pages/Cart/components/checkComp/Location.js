export const Location = ({location,handleChangeValues,allowChange }) => {
    return (
        <>
            <div>
                <label htmlFor="address" className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number:</label>
                <input type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={location?.address || ''}  onChange={e => handleChangeValues({ address: e.target.value })} required />
            </div>
            <div className="">
                <label htmlFor="city" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date:</label>
                <input type="text" name="city" id="city" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={location?.city || ''} onChange={e => handleChangeValues({ city: e.target.value })}  max="12" required />
            </div>
            <div>
                <label htmlFor="country" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Country:</label>
                <input type="text" name="country" id="country" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={location?.country || ''} onChange={e => handleChangeValues({ country: e.target.value })}  required />
            </div>
        </>
    )
}