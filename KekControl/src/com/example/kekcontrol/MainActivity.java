package com.example.kekcontrol;

import java.io.IOException;
import java.util.LinkedList;
import java.util.List;

import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.utils.URLEncodedUtils;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.message.BasicNameValuePair;

import android.app.Activity;
import android.os.AsyncTask;
import android.os.Bundle;
import android.view.View;
import android.view.View.OnClickListener;
import android.widget.Button;

public class MainActivity extends Activity implements OnClickListener {
	
	
	
	Button up, down, left, right, stop;
	String commd;
	
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
		up = (Button) findViewById(R.id.buttonUp);
		down = (Button) findViewById(R.id.buttonDown);
		left = (Button) findViewById(R.id.buttonLeft);
		right = (Button) findViewById(R.id.buttonRight);
		stop = (Button) findViewById(R.id.buttonStop);
		
		up.setOnClickListener(this);
		down.setOnClickListener(this);
		left.setOnClickListener(this);
		right.setOnClickListener(this);
		stop.setOnClickListener(this);
	}
	
	private class NetworkTask extends AsyncTask {

		@Override
		protected Object doInBackground(Object... params) {
			HttpClient httpClient = new DefaultHttpClient();
			HttpGet httpGet = new HttpGet(addLocationToUrl("http://5ad6e740.ngrok.com")); 
			
			try {
				httpClient.execute(httpGet);
			} catch (ClientProtocolException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
			return null;
		}
		
		protected String addLocationToUrl(String url){
		    if(!url.endsWith("?"))
		        url += "?";

		    List<BasicNameValuePair> params = new LinkedList<BasicNameValuePair>();

		    params.add(new BasicNameValuePair("Body", commd));

		    String paramString = URLEncodedUtils.format(params, "utf-8");

		    url += paramString;
		    return url;
		}   
	}

	@Override
	public void onClick(View v) {
		
		switch (v.getId()) {
		case R.id.buttonUp:
			commd = "go";
			new NetworkTask().execute();
			break;
		case R.id.buttonDown:
			commd = "back";
			new NetworkTask().execute();
			break;
		case R.id.buttonLeft:
			commd = "left";
			new NetworkTask().execute();
			break;
		case R.id.buttonRight:
			commd = "right";
			new NetworkTask().execute();
			break;
		case R.id.buttonStop:
			commd = "halt";
			new NetworkTask().execute();
			break;
		}	
	}
}
