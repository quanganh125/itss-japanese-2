// import React from "react";

// export default function CreateProduct() {
//     return (
//         <div>
//             <label class="mdc-text-field mdc-text-field--outlined">
//                 <span class="mdc-notched-outline">
//                     <span class="mdc-notched-outline__leading"></span>
//                     <span class="mdc-notched-outline__notch">
//                         <span class="mdc-floating-label" id="my-label-id">Your Name</span>
//                     </span>
//                     <span class="mdc-notched-outline__trailing"></span>
//                 </span>
//                 <input type="text" class="mdc-text-field__input" aria-labelledby="my-label-id"/>
//             </label>
//         </div>
//     );
// }
import React, { Component } from "react";
import axios from "axios";
import { toast } from "react-toastify";
const maxFileSize = 5000000;
const imageFileRegex = /\.(gif|jpg|jpeg|tiff|png)$/i;
import { api } from "../../constant";
class CreateProduct extends Component {
    state = {
        content: "",
        imageUrl: "",
        category: "",
        file: undefined,
        errormessage: "",
        successmessage: "",
        price: "",
        name: "",
        url: "",
    };
    handleReturnHomePage = () => {
        this.setState({
            successmessage: "",
        });
        window.location.href = `/`;
    };
    //xu li ten cua san pham
    handleNameChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            name: event.target.value,
        });
    };
    // handleImageUrlChange = (event) => {
    //     this.setState({
    //         successmessage: "",
    //     });
    //     this.setState({
    //         imageUrl: event.target.value,
    //     });
    // };
    handleCategoryChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            category: event.target.value,
        });
    };
    //xu li gia cua san pham
    handlePriceChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            price: event.target.value,
        });
    };
    handleContentChange = (event) => {
        this.setState({
            successmessage: "",
        });
        this.setState({
            content: event.target.value,
        });
    };
    handleFileChange = (event) => {
        this.setState({
            successmessage: "",
        });
        const file = event.target.files[0];
        if (!imageFileRegex.test(file.name)) {
            this.setState({
                errormessage: "invalid file",
            });
        } else if (file.size > maxFileSize) {
            this.setState({
                errormessage: "file is too large",
            });
        } else {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                //filereader.result
                console.log(fileReader.result.split(",")[1]);
                this.setState({
                    errormessage: "",
                    file: file,
                    url: fileReader.result.split(",")[1],
                    imageUrl: fileReader.result,
                });
            };
        }
    };
    handleFormSubmit = async (event) => {
        // window.location.reload(false);
        event.preventDefault();
        const packets = {
            name: this.state.name,
            price: this.state.price,
            //file: this.state.file,
            category_id: this.state.category,
            description: this.state.content,
            image_link: this.state.url,
            // userLevel: this.state.userLevel,
            // password: this.state.password
        };
        await axios
            .post(`${api}api/product`, packets)
            .then((response) => {
                toast.success("製品が正常に作成されました！");
                //window.location.href = `/product/manager`;
            })
            .catch((error) => {
                toast.error("製品の作成に失敗しました！");
                console.error("ERROR:: ", error.response.data);
            });
    };
    render() {
        return (
            <div
                className="row mt-5"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <div className="col-9">
                    <h3>新製品を作成</h3>
                    <form onSubmit={this.handleFormSubmit}>
                        <div className="form-group">
                            <div
                                style={{
                                    position: `relative`,
                                    top: `30px`,
                                    textAlign: "center",
                                }}
                            >
                                画像を選択 ...
                            </div>
                            <input
                                id="file"
                                type="file"
                                className="form-control"
                                accept="image/*"
                                style={{
                                    color: "transparent",
                                    margin: `0 auto`,
                                    textIndent: `-999em`,
                                    zIndex: 10,
                                    height: `50px`,
                                }}
                                onChange={this.handleFileChange}
                            />
                        </div>
                        {this.state.imageUrl ? (
                            <div
                                style={{
                                    backgroundImage: `url(${this.state.imageUrl})`,
                                    backgroundRepeat: "no-repeat",
                                    backgroundSize: "cover",
                                    width: "100%",
                                    height: "400px",
                                }}
                            ></div>
                        ) : null}
                        {/* <div className="form-group">
                            <h5>Image</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="Please input image link ..."
                                value={this.state.imageUrl}
                                onChange={this.handleImageUrlChange}
                            ></textarea>
                        </div> */}
                        {/* input ten cua san pham */}
                        <div className="form-group">
                            <h5>名前</h5>
                            <input
                                className="form-control"
                                placeholder="製品名を入力してください ..."
                                value={this.state.name}
                                onChange={this.handleNameChange}
                            />
                        </div>
                        <div className="form-group">
                            <h5>説明</h5>
                            <textarea
                                className="form-control"
                                id="exampleFormControlTextarea1"
                                rows="4"
                                placeholder="説明を入力してください ..."
                                value={this.state.content}
                                onChange={this.handleContentChange}
                            ></textarea>
                        </div>
                        {/* <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Please input category."
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                            />
                            
                        </div> */}
                        <div className="form-group">
                            <h5>カテゴリー</h5>
                            <select
                                className="form-control"
                                name="製品のカテゴリを入力してください..."
                                value={this.state.category}
                                onChange={this.handleCategoryChange}
                            >
                                <option>カテゴリを選択</option>
                                <option value="1">春</option>
                                <option value="2">夏</option>
                                <option value="3">秋</option>
                                <option value="4">冬</option>
                                <option value="5">なんでもいい</option>
                            </select>
                            {/* input gia cua san pham */}
                        </div>
                        <div className="form-group">
                            <h5>価格</h5>
                            <input
                                className="form-control"
                                placeholder="価格を入力してください..."
                                value={this.state.price}
                                onChange={this.handlePriceChange}
                            />
                        </div>

                        <div className="form-group"></div>
                        {this.state.errormessage ? (
                            <div className="alert alert-danger" role="alert">
                                {this.state.errormessage}
                            </div>
                        ) : null}
                        {this.state.successmessage ? (
                            <div className="alert alert-danger" role="alert">
                                {this.state.successmessage}
                            </div>
                        ) : null}
                        <div
                            className="form-group"
                            style={{
                                textAlign: `center`,
                            }}
                        >
                            <input
                                type="submit"
                                className="btn btn-primary"
                                value="作成"
                                style={{ marginRight: 10 }}
                            />
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={this.handleReturnHomePage}
                                style={{ marginLeft: 10 }}
                            >
                                キャンセル
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default CreateProduct;
