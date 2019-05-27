/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service;

import com.lb.lbstore.domain.RuKuDetail;
import com.lb.lbstore.domain.TuiHuo;
import com.lb.lbstore.domain.TuiHuoFei;
import java.util.HashMap;
import java.util.List;

/**
 *
 * @author Administrator
 */
public interface TuiHuoService {

    public TuiHuo getTuiHuoById(Integer id);
    
    public TuiHuo getTuiHuoDetailById(Integer id);
       
    public boolean updateTuiHuo(TuiHuo tuiHuo);
    
    public String dealTuiHuo(TuiHuo tuiHuo,Integer a01_id);
    
    public TuiHuo saveTuiHuo(TuiHuo tuiHuo);
    
    public boolean deleteTuiHuo(Integer id);
    
    public int queryRows(HashMap map);
    
    public List<TuiHuo> queryTuiHuosByPage(HashMap map);
    
    public int queryFeiRows(HashMap map);
    
    public List<TuiHuoFei> queryTuiHuoFeisByPage(HashMap map);
    
    public TuiHuoFei getTuiHuoFeiById(Integer id);

     public boolean updateTuiHuoFei(TuiHuoFei tuiHuoFei);
       
    public TuiHuoFei saveTuiHuoFei(TuiHuoFei tuiHuoFei);
    
    public boolean deleteTuiHuoFei(Integer id,Integer fh_id);
    
}
