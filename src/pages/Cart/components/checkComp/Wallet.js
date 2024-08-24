export const Wallet = ({wallet,handleChangeValues,allowChange }) => {
    return (
        <>
            <div>
                <label htmlFor="card" className="mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Card Number:</label>
                <input type="number" name="card" id="card" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={wallet?.card || ''} readOnly={allowChange} onChange={e => handleChangeValues({ card: e.target.value })} required />
            </div>
            <div className="">
                <div><label htmlFor="code" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Expiry Date:</label></div>
                <input type="number" name="month" id="month" className="inline-block w-20 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={wallet?.month || ''} onChange={e => handleChangeValues({ month: e.target.value })} readOnly={allowChange} max="12" required />
                <input type="number" name="year" id="year" className="inline-block w-20 ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={wallet?.year || ''} onChange={e => handleChangeValues({ year: e.target.value })} readOnly={allowChange} required />
            </div>
            <div>
                <label htmlFor="code" className=" mb-2 text-sm font-medium text-gray-900 dark:text-gray-300" >Security Code:</label>
                <input type="number" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:value-gray-400 dark:text-white" value={wallet?.cvv || null} onChange={e => handleChangeValues({ cvv: e.target.value })} readOnly={allowChange} required />
            </div>
        </>
    )
}