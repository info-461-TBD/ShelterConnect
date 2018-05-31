
editData(evt, msgSnapshot) {
    evt.preventDefault();
    msgSnapshot.ref.update({
        "request_text": this.state.edit,
    });
    this.setState({edit: ""});
}

let reqSnapshot = this.props.reqSnapshot;
let request = reqSnapshot.val();

message.author.displayName === this.props.displayName ?
<div>
	<form onSubmit={evt => this.editData(evt, msgSnapshot)}>
	    <div className="form-group">
	        <input type="text" className="form-control" 
	        placeholder="edit your message"
	        value={this.state.edit}
	        onInput={evt => this.setState({edit: evt.target.value})}/>
	    </div>
	    <button type="submit" className="mx-1">Edit</button> 
	    <button className="mx-1" onClick={evt => this.deleteData(evt, msgSnapshot)}>Delete</button>
	</form>
</div> : undefined
