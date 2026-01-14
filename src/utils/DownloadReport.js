function downloadReport(data){
    const blob = new Blob([data.data], { type: data.headers['content-type'] });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "AppReport.pdf";
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();

    setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
    }, 100);
}

export default downloadReport;