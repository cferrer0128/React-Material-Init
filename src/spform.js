import React from "react"
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Divider from '@material-ui/core/Divider';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';



import $ from 'jquery'
import 'core-js/es6/map';
import 'core-js/es6/set';

const styles = theme => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width:'100%'
    },

    formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
      
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
     
      width: 550,
    },
    menu: {
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
      },
      leftIcon: {
        marginRight: theme.spacing.unit,
      },
      rightIcon: {
        marginLeft: theme.spacing.unit,
      },
      iconSmall: {
        fontSize: 20,
      },
  });

class SPForm  extends React.Component{


    componentDidMount() {
        // Typical usage (don't forget to compare props):
        const urlString = this.state.ajaxUrl

        console.log('componentDidMount ' , urlString)
        $.ajax({
            headers:{
                Accept:"application/json; odata=verbose",
                contentType:"application/json"
            },
            url:urlString,
            success: items =>{

                console.log("OK Api ", items.d) 
            },
            error: err =>{
                console.log("Error Api ", err)
            }
        })
        
      }
    constructor(props){
        super(props)

        let tempDate = new Date();
        let month=''
        if((tempDate.getMonth()+1)<=9){
            month = '0'+(tempDate.getMonth()+1)
        }
        let curdate = tempDate.getFullYear() + '-' + month + '-' + tempDate.getDate();
        console.log(curdate)
        this.state = {
            value: '',
            name: 'Not Started',
            age: '',
            multiline: 'Controlled',
            today:curdate,
            url:''+document.location.protocol+'/'+document.location.host,
            ajaxUrl:"/DemoV11/_api/web/lists/GetByTitle('SiteApprovals')/items"
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
        

    }
    
    handleChange(event) {

        this.setState({url: document.location.protocol+'/'+document.location.host+'/'+ event.target.value});
        this.setState({value: event.target.value});
        
        console.log('value , Name ', this.state.url , this.state.value)
    }

    handleSave(event){
        console.log('value ', event.target)
        
        $.ajax({
            type:'POST',
            headers:{
                accept:"application/json; odata=verbose",
                "X-RequestDigest": jQuery("#__REQUESTDIGEST").val()
            },
            contentType:"application/json;odata=verbose",
            url:this.state.ajaxUrl,
            data :JSON.stringify({"__metadata": {"type": "SP.Data.SiteApprovalsListItem" },"Title": this.state.value,"SiteName":this.state.url, "ClientName":this.state.value}),
            success: items =>{

                console.log("OK Api ", items.d) 
            },
            error: err =>{
                console.log("Error Api ", err)
            }
        })
    }
    
    render(){
        const { classes } = this.props;
        return (
            
            <form className={classes.container} noValidate autoComplete="off">
            <table><tbody><tr><td>
            <TextField
                required
                id="required"
                label="Client Name"
                placeholder="Client Name"
                className={classes.textField}
                onChange={this.handleChange}
                margin="normal"
            />
                
            </td><td>
            <TextField
                    id="read-only-input"
                    placeholder="Web Site Name"
                    value={this.state.url}

                    className={classes.textField}
                                    
                    InputProps={{
                        readOnly: true,
                    }}
            />
            </td></tr><tr><td>
            <TextField
                id="date"
                label="Go Live"
                type="date"
                className={classes.textField}
                defaultValue={this.state.today}
                InputLabelProps={{
                shrink: true,
                }}
            /> </td><td>
                
              
                    <TextField
                            id="read-only-input"
                            label="Status"
                            defaultValue="Not Started"
                            className={classes.textField}
                            InputProps={{
                                readOnly: true,
                            }}
                    />
  
             
            </td></tr>
            <tr><td>
            <TextField
                    id="read-only-input"
                    label="Approvers"
                    defaultValue=""
                    className={classes.textField}
                    InputProps={{
                        readOnly: true,
                    }}
            />
           
            </td></tr>
            <tr>
                <td>

                <Button variant="contained" 
                    color="secondary" 
                    className="btnColor"
                    onClick={this.handleSave}>
                    Save
                    <Icon>save</Icon>
                </Button>

                </td>
            </tr>
            </tbody></table>
            </form>
        )
    }
}

export default withStyles(styles)(SPForm)

